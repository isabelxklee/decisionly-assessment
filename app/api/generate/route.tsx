import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI();

export async function POST(request: NextRequest) {
  const body: NextRequest = await request.json();

  const prompt = `Analyze the following data in this chargeback representment document: ${JSON.stringify(
    body
  )}. Please provide a concise (1-2 sentences) summary of the document and evidence that the transaction was approved by the cardholder / customer.`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  // console.log("response", response.choices[0].message.content);

  return NextResponse.json({ response: response.choices[0].message.content });
}
