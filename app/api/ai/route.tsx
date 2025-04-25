import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [{ role: "user", content: "write a haiku about ai" }],
  });

  completion.then((result) => {
    return NextResponse.json({ result: result.choices[0].message });
  });
}
