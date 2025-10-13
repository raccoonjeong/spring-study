// KakaoMap.jsx
import { useEffect, useRef } from "react";

const loadKakao = (() => {
  let p;
  return (appKey, libs = "services") => {
    if (window.kakao?.maps) return Promise.resolve();
    if (p) return p;

    p = new Promise((resolve, reject) => {
      const id = "kakao-maps-sdk";
      let s = document.getElementById(id);
      const url = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}`;

      if (s && s.src !== url) {
        s = document.createElement("script");
        s.id = id;
        s.async = true;
        s.src = url;
        s.onload = () => window.kakao.maps.load(resolve);
        s.onerror = () => reject(new Error("Kakao SDK load failed"));
        document.head.appendChild(s);
      } else if (!window.kakao?.maps) {
        s.addEventListener("load", () => window.kakao.maps.load(resolve), {
          once: true,
        });
        s.addEventListener("error", reject, { once: true });
      } else {
        resolve();
      }
    });

    return p;
  };
})();

/**
 * props
 * - markers: [{ id, lat, lng, title, address?, phone? }]
 * - activeId?: 현재 포커스할 id (카드 클릭 등)
 * - focusLevel?: number (포커스 시 적용할 줌 레벨, 없으면 유지)
 * - animate?: boolean (true면 panTo)
 * - level?: number (초기 줌)
 * - height?: number (맵 높이)
 * - markerIconUrl?: string (모든 마커 공통 아이콘 경로)
 * - markerIconSize?: { w, h }  (기본 24x28)
 * - markerIconAnchor?: { x, y } (기본 x=w/2, y=h)
 * - showMapType?: boolean (지도/스카이뷰 토글)
 * - showZoom?: boolean (줌 컨트롤)
 * - infoMaxWidth?: number (인포 최대폭 px, 내용에 맞춰 늘어나되 상한)
 * - onMarkerClick?: (id) => void (마커 클릭 시 부모 동기화)
 */
export default function KakaoMap({
  markers = [],
  activeId = null,
  focusLevel,
  animate = true,
  level = 7,
  height = 420,
  markerIconUrl,
  markerIconSize = { w: 24, h: 28 },
  markerIconAnchor,
  showMapType = true,
  showZoom = true,
  infoMaxWidth = 420,
  onMarkerClick,
}) {
  const wrapRef = useRef(null);
  const mapRef = useRef(null);
  const controlsRef = useRef({ mapType: null, zoom: null });
  const markerMapRef = useRef(new Map()); // key: String(id) -> { marker, pos, data }
  const infoRef = useRef(null); // 재사용 InfoWindow
  const lastOpenTokenRef = useRef(0); // 최신 오픈 요청 토큰
  const appKey = import.meta.env.VITE_KAKAO_MAP_KEY;

  const esc = (v = "") =>
    String(v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const infoHtml = (s) => `
    <div style="
      width:fit-content; max-width:${infoMaxWidth}px;
      padding:10px 12px; font-size:12px; line-height:1.45; word-break:keep-all;
   
    ">
      <div style="font-weight:600; color:#0063ba; margin-bottom:4px;">${esc(
        s.title || ""
      )}</div>
      ${
        s.address
          ? `<div style="white-space:nowrap;">${esc(s.address)}</div>`
          : ""
      }
      ${s.phone ? `<div style="color:#666;">☎ ${esc(s.phone)}</div>` : ""}
    </div>
  `;

  function openInfo(entry, { animate: doAnimate = true, focusLevel: fl } = {}) {
    const map = mapRef.current;
    const info = infoRef.current;
    if (!map || !info || !entry) return;

    const { marker, pos, data } = entry;

    // 1) 인포창은 닫지 않는다. 내용만 즉시 업데이트
    info.setContent(infoHtml(data));

    // 2) 줌 먼저
    if (typeof fl === "number") map.setLevel(fl);

    // 3) 이동 & 재앵커
    if (doAnimate && map.panTo) {
      const cur = map.getCenter?.();
      const same =
        cur &&
        Math.abs(cur.getLat() - pos.getLat()) < 1e-9 &&
        Math.abs(cur.getLng() - pos.getLng()) < 1e-9;

      if (same) {
        // 같은 위치면 idle이 안 올 수 있으니 바로 새 마커로 재앵커
        info.open(map, marker); // ✨ 닫지 않고 위치만 새 마커로
        return;
      }

      // panTo 끝난 뒤(또는 fallback) 새 마커에 재앵커
      let done = false;
      const handler = () => {
        if (done) return;
        done = true;
        window.kakao.maps.event.removeListener(map, "idle", handler);
        info.open(map, marker); // ✨ 재앵커 (close 없이)
      };
      window.kakao.maps.event.addListener(map, "idle", handler);

      setTimeout(() => {
        if (done) return;
        done = true;
        window.kakao.maps.event.removeListener(map, "idle", handler);
        info.open(map, marker); // ✨ fallback으로도 재앵커
      }, 700);

      map.panTo(pos);
    } else {
      map.setCenter(pos);
      info.open(map, marker); // ✨ 재앵커
    }
  }

  // 최초 로드 및 마커 렌더
  useEffect(() => {
    let cleanupResize;

    (async () => {
      if (!appKey)
        return console.error("[KAKAO] env 키 없음 (.env 설정 후 dev 재시작)");
      await loadKakao(appKey);

      // 지도 생성/갱신
      if (!mapRef.current) {
        mapRef.current = new window.kakao.maps.Map(wrapRef.current, {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level,
        });
        const onResize = () => mapRef.current?.relayout();
        window.addEventListener("resize", onResize);
        cleanupResize = () => window.removeEventListener("resize", onResize);

        // 재사용 InfoWindow (닫기 X 버튼 포함)
        infoRef.current = new window.kakao.maps.InfoWindow({
          content: "<div/>",
          removable: true,
        });
      } else {
        mapRef.current.setLevel(level);
      }
      const map = mapRef.current;

      // 컨트롤 재설치
      const removeCtl = (ctl) => ctl && map.removeControl(ctl);
      removeCtl(controlsRef.current.mapType);
      removeCtl(controlsRef.current.zoom);

      if (showMapType) {
        const ctl = new window.kakao.maps.MapTypeControl();
        map.addControl(ctl, window.kakao.maps.ControlPosition.TOPRIGHT);
        controlsRef.current.mapType = ctl;
      } else controlsRef.current.mapType = null;

      if (showZoom) {
        const ctl = new window.kakao.maps.ZoomControl();
        map.addControl(ctl, window.kakao.maps.ControlPosition.RIGHT);
        controlsRef.current.zoom = ctl;
      } else controlsRef.current.zoom = null;

      // 기존 마커 제거
      markerMapRef.current.forEach(({ marker }) => marker?.setMap(null));
      markerMapRef.current.clear();
      //infoRef.current?.close();

      // 공통 아이콘
      let markerImage = null;
      if (markerIconUrl) {
        const w = markerIconSize?.w ?? 24;
        const h = markerIconSize?.h ?? 28;
        const size = new window.kakao.maps.Size(w, h);
        const offset = new window.kakao.maps.Point(
          markerIconAnchor?.x ?? Math.floor(w / 2),
          markerIconAnchor?.y ?? h
        );
        markerImage = new window.kakao.maps.MarkerImage(markerIconUrl, size, {
          offset,
        });
      }

      // 마커 생성
      const allPositions = [];
      markers.forEach((s) => {
        const lat = Number(s.lat),
          lng = Number(s.lng);
        if (Number.isNaN(lat) || Number.isNaN(lng)) return;

        const pos = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: pos,
          map,
          image: markerImage || undefined,
          title: s.title,
        });

        const entry = { marker, pos, data: s };
        markerMapRef.current.set(String(s.id), entry);
        allPositions.push(pos);

        kakao.maps.event.addListener(marker, "click", () => {
          onMarkerClick?.(s.id); // 부모 동기화(선택사항)
          openInfo(entry, { animate: true, focusLevel }); // 닫지 않고 내용만 갱신 + 재앵커
        });
      });

      // 초기엔 전체가 보이도록
      if (allPositions.length && !activeId) {
        const bounds = new window.kakao.maps.LatLngBounds();
        allPositions.forEach((p) => bounds.extend(p));
        map.setBounds(bounds);
      }

      // 마커 생성 직후에 이미 activeId가 있다면 바로 열기
      if (activeId) {
        const entry = markerMapRef.current.get(String(activeId));
        entry && openInfo(entry, { animate, focusLevel });
      }
    })();

    return () => cleanupResize && cleanupResize();
  }, [
    markers,
    markerIconUrl,
    markerIconSize?.w,
    markerIconSize?.h,
    markerIconAnchor?.x,
    markerIconAnchor?.y,
    level,
    showMapType,
    showZoom,
    infoMaxWidth,
    appKey,
    onMarkerClick,
    activeId, // 생성 직후 반영
    animate,
    focusLevel,
  ]);

  // activeId 변경될 때마다 이동+오픈
  useEffect(() => {
    if (activeId == null) return;
    const entry = markerMapRef.current.get(String(activeId));
    entry && openInfo(entry, { animate, focusLevel });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  return <div ref={wrapRef} style={{ width: "100%", height }} />;
}
