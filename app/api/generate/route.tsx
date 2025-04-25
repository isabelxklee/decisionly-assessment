import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI();

export async function POST(request: NextRequest) {
  const body: NextRequest = await request.json();

  const prompt = `Analyze the following data: ${JSON.stringify(
    body
  )}. Provide a summary.`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  // console.log("response", response.choices[0].message.content);

  return NextResponse.json({ response: response.choices[0].message.content });
}
