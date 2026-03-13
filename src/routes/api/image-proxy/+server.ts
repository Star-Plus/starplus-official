import { error } from "@sveltejs/kit";

export async function GET({ url, fetch }: { url: URL; fetch: typeof globalThis.fetch }) {
    const target = url.searchParams.get("url") || "";

    if (!/^https?:\/\//i.test(target)) {
        throw error(400, "Invalid image URL");
    }

    const upstream = await fetch(target);
    if (!upstream.ok) {
        throw error(upstream.status, `Failed to fetch upstream image: ${upstream.statusText}`);
    }

    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    const body = await upstream.arrayBuffer();

    return new Response(body, {
        status: 200,
        headers: {
            "content-type": contentType,
            "cache-control": "public, max-age=3600"
        }
    });
}
