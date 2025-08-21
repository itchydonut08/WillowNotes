// /functions/api/openai.ts
export const onRequestPost: PagesFunction<{ OPENAI_API_KEY: string }> = async ({ request, env }) => {
  try {
    const userBody = await request.json();

    // Basic input guardrails (optional but recommended)
    if (!userBody || typeof userBody !== "object") {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
    }

    // Forward to OpenAI Responses API (safer, modern endpoint)
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userBody),
    });

    // Pass through status and body (do NOT reveal key)
    return new Response(upstream.body, {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? "Server error" }), { status: 500 });
  }
};
