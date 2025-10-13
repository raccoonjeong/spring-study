const BASE_URL = "http://localhost:4000";

export async function requestAPI(path, { method = "GET", data } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: data ? JSON.stringify(data) : undefined,
  });

  // 응답 본문을 먼저 확보(텍스트 → JSON 시도)
  const ct = res.headers.get("content-type") || "";
  const raw = await (ct.includes("application/json") ? res.json() : res.text());

  if (!res.ok) {
    const msg =
      typeof raw === "string"
        ? raw
        : raw?.message || raw?.error || `HTTP ${res.status}`;
    throw new Error(msg); // <- 여기서 서버가 보낸 원인(Invalid credentials 등)이 보임
  }

  return raw;
}
