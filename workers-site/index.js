import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", (event) => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    const assetResponse = await getAssetFromKV(event);
    const newResponse = new Response(assetResponse.body, assetResponse);
    newResponse.headers.append("cache-control", "public, max-age=86400");
    return newResponse;
  } catch (e) {
    const pathname = new URL(event.request.url).pathname;
    return new Response(`"${pathname}" not found`, {
      status: 404,
      statusText: "not found",
    });
  }
}
