// /functions/api/openai.ts
export const onRequestPost: PagesFunction<{ OPENAI_API_KEY: string }> = async ({ request, env }) => {
  try {
    const body = await request.json();
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Server error" }), { status: 500 });
  }
};
