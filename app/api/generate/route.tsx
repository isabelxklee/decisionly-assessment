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
    purchaseType: z.string(),
    evidence: z.string(),
    reason: z.string(),
  });

  const prompt = `Analyze the following data in this chargeback representment document: ${JSON.stringify(
    body
  )}. Please provide a 1-sentence summary of the document and a numbered list of 2-4 points of evidence that the transaction was approved by the cardholder / customer. Please state if the purchase type is a digital product or physical product. If the transaction is regarding a digital product, please provide evidence that the digital product was accessed or used by the customer. If the transaction is regarding a physical product, please provide shipping tracking numbers and any proof of successful delivery. Please state the customer's reason for filing the dispute. If there is no explicit reason, please state "N/A".`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: zodResponseFormat(ResponseObject, "doc_summary"),
  });

  // console.log("response", response.choices[0].message.content);

  return NextResponse.json({ response: response.choices[0].message.content });
}
