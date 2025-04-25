import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI();

export async function POST(request: NextRequest) {
  console.log(request.body);

  const prompt = `Analyze the following data: ${JSON.stringify(
    request.body
  )}. Provide a summary.`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  console.log("response", response.choices[0].message);

  return NextResponse.json({ response: response.choices[0].message });
}
