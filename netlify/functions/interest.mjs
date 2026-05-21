import { getStore } from "@netlify/blobs";

const BASE_INTEREST = 880;
const COUNT_KEY = "count";
const headers = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store"
};

async function readCount(store) {
  const saved = await store.get(COUNT_KEY, { type: "json" });
  const count = Number(saved?.count);
  return Number.isFinite(count) && count >= BASE_INTEREST ? count : BASE_INTEREST;
}

export default async function handler(request) {
  if (request.method !== "GET" && request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers
    });
  }

  const store = getStore("synapse-interest");
  const current = await readCount(store);

  if (request.method === "GET") {
    return new Response(JSON.stringify({ count: current }), { status: 200, headers });
  }

  const next = current + 1;
  await store.setJSON(COUNT_KEY, { count: next, updatedAt: new Date().toISOString() });

  return new Response(JSON.stringify({ count: next }), { status: 200, headers });
}
