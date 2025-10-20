// generic-scrape.mjs
import fs from "node:fs/promises";
import path from "node:path";
import { URL as NodeURL } from "node:url";

const config = {
  url: "https://www.skecherskorea.co.kr/sub_product/list.php?cate=0002_0065_0014_",
  listSelector: ".prod_st",
  category: "women",
  fields: [
    {
      key: "title",
      selector: ".con_wrap .tit",
      mode: "text",
    },
    {
      key: "href",
      selector: "> a",
      mode: "attr",
      attr: "href",
      absolute: true,
    },
    {
      key: "img",
      selector: "> a img",
      mode: "attr",
      attr: "src",
      absolute: true,
    },
    {
      key: "imgOver",
      selector: "> a img",
      mode: "attr",
      attr: "data-onover",
      absolute: true,
    },
    {
      key: "priceText",
      selector: ".price",
      mode: "text",
    },
    {
      key: "price",
      selector: ".price",
      mode: "int",
    },
    {
      key: "priceArr",
      selector: ".price",
      mode: "arr",
    },
    {
      key: "badges",
      selector: ".con_wrap > .icon .ico",
      mode: "arr",
      all: true, // 노드들 전부 배열로 모으기
      arrayClean: true,
    },
    {
      key: "sizes",
      selector: ".size ul.list li",
      mode: "int", // "250" -> 250
      all: true, // 노드들 전부 배열로 모으기
      arrayClean: true,
    },
    {
      key: "disabledSizes",
      selector: ".size ul.list li.off",
      mode: "int",
      all: true,
      arrayClean: true,
    },
    {
      key: "starOn",
      selector: ".tt_star .star i.on",
      mode: "count",
    },
    {
      key: "starHalf",
      selector: ".tt_star .star i.half",
      mode: "count",
    },
    {
      key: "starAll",
      selector: ".tt_star .star i",
      mode: "count",
    },
    {
      key: "reviewCount",
      selector: ".tt_star .no",
      mode: "int",
    },
  ],
  outPrefix: "product",
  dropEmpty: true,
  postProcess,
  detail: {
    urlFromField: "href",
    urlSelector: "> a",
    urlAttr: "href",
    delayMs: 150, // 사이트 배려용(선택)
    fields: [
      {
        key: "thumbs",
        selector: ".swiper-wrapper.list li .re.va_wrap img",
        mode: "attr",
        attr: "src",
        all: true,
        absolute: true,
        arrayClean: true,
      },
    ],
    // 상세 페이지 후처리 훅(선택)
    postProcess: (obj, ctx) => obj,
  },
};

function postProcess(item) {
  // title 없으면 삭제
  if (!item.title || !String(item.title).trim()) return null;

  // priceArr = ["139,000", "109,000", "22%"] 형태일 때
  if (Array.isArray(item.priceArr) && item.priceArr.length) {
    const [beforeRaw, nowRaw, rateRaw] = item.priceArr;

    // 1) 정가
    const before = beforeRaw
      ? parseInt(String(beforeRaw).replace(/[^\d]/g, ""), 10)
      : null;
    if (Number.isFinite(before)) {
      item.priceBefore = before; // 예: 139000
    }

    // 2) 현재가 (price 덮어쓰기)
    const now = nowRaw
      ? parseInt(String(nowRaw).replace(/[^\d]/g, ""), 10)
      : null;
    if (Number.isFinite(now)) {
      item.price = now; // 예: 109000
      // priceText도 없으면 만들어둠(선택)
      if (!item.priceText) item.priceText = nowRaw;
    }

    // 3) 할인율 %
    const rate = rateRaw
      ? parseInt(String(rateRaw).replace(/[^\d]/g, ""), 10)
      : null;
    if (Number.isFinite(rate)) {
      item.saleRate = rate; // 예: 22
    }
  }

  // 배지에서 isNew/isBest (있다면)
  if (Array.isArray(item.badges)) {
    const up = item.badges.map((s) => String(s).toUpperCase());
    item.isNew = up.some((t) => t.includes("NEW"));
    item.isBest = up.some((t) => /\bBEST\b/.test(t));
  }

  // 별점 계산하기
  if (typeof item.starOn === "number" || typeof item.starHalf === "number") {
    const on = item.starOn || 0;
    const half = item.starHalf || 0;
    const all = item.starAll || on + half || 5;
    item.rating = on + half * 0.5; // 예: 4.5
    item.ratingMax = all; // 예: 5
    delete item.starOn;
    delete item.starHalf;
    delete item.starAll;
  }

  return item;
}

function absUrl(base, maybe) {
  if (!maybe) return "";
  try {
    return new NodeURL(maybe, base).toString();
  } catch {
    return maybe;
  }
}
function textOf($, node) {
  return $(node).text().replace(/\s+/g, " ").trim();
}
function toIntKRW(s) {
  if (!s) return null;
  const t = String(s).replace(/[^\d]/g, "");
  return t ? parseInt(t, 10) : null;
}
function pickAttr($el, attrSpec = "") {
  const names = attrSpec.split("|").map((s) => s.trim());
  for (const n of names) {
    const v = $el.attr(n);
    if (v) return v;
  }
  return "";
}
function isEmptyObject(obj) {
  return obj && typeof obj === "object" && Object.keys(obj).length === 0;
}
function normalizeSelectors(field) {
  if (Array.isArray(field.selectors) && field.selectors.length)
    return field.selectors;
  if (typeof field.selector === "string") {
    const parts = field.selector
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    return parts.length ? parts : [field.selector];
  }
  return [];
}
function findWithPriority($root, $, field) {
  const sels = normalizeSelectors(field);
  for (const sel of sels) {
    const $nodes = $root.find(sel);
    if ($nodes.length) return $nodes;
  }
  return $();
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "ko,en;q=0.8",
    },
    redirect: "follow",
  });
  return await res.text();
}

function extractFrom($ctx, $, fields, baseUrl) {
  const obj = {};
  for (const f of fields) {
    const {
      key,
      mode = "text",
      attr,
      absolute = false,
      all = false,
      arrayClean = false,
      value,
    } = f;
    if (!key) continue;

    if (mode === "const") {
      obj[key] = value;
      continue;
    }

    const $nodes = findWithPriority($ctx, $, f);

    if (mode === "count") {
      obj[key] = $nodes.length;
      continue;
    }

    if (!$nodes.length) continue;

    if (all) {
      const arr = [];

      $nodes.each((__, node) => {
        const $n = $(node);
        let val = null;
        if (mode === "text") val = textOf($, $n);
        else if (mode === "attr") {
          const raw = attr ? pickAttr($n, attr) : "";
          val = absolute ? absUrl(baseUrl, raw) : raw;
        } else if (mode === "html") val = $n.html()?.trim() || "";
        else if (mode === "int") {
          val = toIntKRW(textOf($, $n));
        } else if (mode === "arr") {
          const t = textOf($, $n);

          if (t?.length) arr.push(t);
          val = null;
        } else val = textOf($, $n);

        if (mode !== "arr") {
          const ok = Array.isArray(val)
            ? val.length > 0
            : val != null && String(val).trim() !== "";
          if (ok) arr.push(val);
        }
      });
      obj[key] = arrayClean ? Array.from(new Set(arr)) : arr;
      continue;
    }

    const $first = $nodes.first();
    let val = null;
    if (mode === "text") val = textOf($, $first);
    else if (mode === "attr") {
      const raw = attr ? pickAttr($first, attr) : "";
      val = absolute ? absUrl(baseUrl, raw) : raw;
    } else if (mode === "html") val = $first.html()?.trim() || "";
    else if (mode === "int") {
      val = toIntKRW(textOf($, $first));
    } else if (mode === "arr") {
      const t = textOf($, $first);
      val = t ? t.split(/\s+/).filter(Boolean) : [];
    } else val = textOf($, $first);

    const shouldSet = Array.isArray(val)
      ? val.length > 0
      : val != null && String(val).trim() !== "";
    if (shouldSet) obj[key] = val;
  }
  return obj;
}

async function scrapeWithConfig(conf) {
  const { url, listSelector, fields } = conf;
  const html = await fetchHtml(url);
  const cheerio = await import("cheerio");
  const $ = cheerio.load(html);

  const items = $(listSelector).toArray();
  const results = [];

  for (const el of items) {
    const $item = $(el);

    // 1) 목록 필드 추출
    let obj = extractFrom($item, $, fields, conf.url);

    // 2) 하드코딩 category 주입
    if (conf.category !== undefined) obj.category = conf.category;

    // 3) 목록 후처리
    obj = conf.postProcess ? conf.postProcess(obj) : obj;
    if (!obj) continue;

    // 4) 상세 페이지 추출(옵션)
    if (conf.detail) {
      let detailUrl = null;

      // 4-1) 목록에서 뽑아둔 필드로 URL 결정
      if (conf.detail.urlFromField && obj[conf.detail.urlFromField]) {
        detailUrl = absUrl(conf.url, String(obj[conf.detail.urlFromField]));
      }

      // 4-2) 필드가 없으면 목록 DOM에서 직접 셀렉터로 시도
      if (!detailUrl && conf.detail.urlSelector) {
        const $link = findWithPriority($item, $, {
          selector: conf.detail.urlSelector,
        });
        if ($link.length) {
          const raw = pickAttr(
            $link.first(),
            conf.detail.urlAttr || "href|data-href"
          );
          detailUrl = absUrl(conf.url, raw);
        }
      }

      if (detailUrl) {
        // 사이트 과부하 방지 딜레이(선택)
        if (conf.detail.delayMs) {
          await new Promise((r) => setTimeout(r, conf.detail.delayMs));
        }
        try {
          const dhtml = await fetchHtml(detailUrl);
          const $d = cheerio.load(dhtml);
          const $droot = conf.detail.rootSelector
            ? $d(conf.detail.rootSelector)
            : $d.root();

          const detailObj = extractFrom(
            $droot,
            $d,
            conf.detail.fields || [],
            detailUrl
          );
          obj = conf.detail.postProcess
            ? conf.detail.postProcess(
                { ...obj, ...detailObj },
                { url: detailUrl, $, $d }
              )
            : { ...obj, ...detailObj };
        } catch (e) {
          console.warn("[detail] fetch/extract failed:", detailUrl, e.message);
        }
      }
    }

    if (!conf.dropEmpty || !isEmptyObject(obj)) results.push(obj);
  }

  return results;
}
async function saveResult(items, { url, outPrefix = "scrape" }) {
  const dir = path.resolve("result");
  await fs.mkdir(dir, { recursive: true });
  const now = new Date();
  const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(
    2,
    "0"
  )}${String(now.getMinutes()).padStart(2, "0")}${String(
    now.getSeconds()
  ).padStart(2, "0")}`;
  let host = "site";
  try {
    host = new NodeURL(url).host.replace(/[:/\\]/g, "_");
  } catch {}
  const file = path.join(dir, `${ts}_${outPrefix}.json`);
  await fs.writeFile(
    file,
    JSON.stringify({ count: items.length, items }, null, 2),
    "utf8"
  );
  return file;
}

(async () => {
  try {
    const items = await scrapeWithConfig(config);
    console.log(JSON.stringify({ count: items.length, items }, null, 2));
    const saved = await saveResult(items, {
      url: config.url,
      outPrefix: config.outPrefix || "scrape",
    });
    console.error(`saved: ${saved}`);
  } catch (err) {
    console.error("ERROR:", err?.stack || err?.message || String(err));
    process.exit(1);
  }
})();
