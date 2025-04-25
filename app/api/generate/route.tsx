import { NextRequest, NextResponse } from "next/server";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import OpenAI from "openai";

const client = new OpenAI();

export async function POST(request: NextRequest) {
  const body: NextRequest = await request.json();

  const ResponseObject = z.object({
    merchant: z.string(),
    customer: z.string(),
    summary: z.string(),
    evidence: z.string(),
  });

  const prompt = `Analyze the following data in this chargeback representment document: ${JSON.stringify(
    body
  )}. Please provide a concise (1-2 sentences) summary of the document and evidence that the transaction was approved by the cardholder / customer.`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: zodResponseFormat(ResponseObject, "doc_summary"),
  });

  // console.log("response", response.choices[0].message.content);

  return NextResponse.json({ response: response.choices[0].message.content });
}
