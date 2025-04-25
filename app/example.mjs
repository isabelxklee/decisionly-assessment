import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [{ role: "user", content: "write a haiku about ai" }],
});

completion.then((result) => console.log(result.choices[0].message));

// const tools = [
//   {
//     type: "function",
//     name: "search_knowledge_base",
//     description: "Query a knowledge base to retrieve relevant info on a topic.",
//     parameters: {
//       type: "object",
//       properties: {
//         query: {
//           type: "string",
//           description: "The user question or search query.",
//         },
//         options: {
//           type: "object",
//           properties: {
//             num_results: {
//               type: "number",
//               description: "Number of top results to return.",
//             },
//             domain_filter: {
//               type: ["string", "null"],
//               description:
//                 "Optional domain to narrow the search (e.g. 'finance', 'medical'). Pass null if not needed.",
//             },
//             sort_by: {
//               type: ["string", "null"],
//               enum: ["relevance", "date", "popularity", "alphabetical"],
//               description: "How to sort results. Pass null if not needed.",
//             },
//           },
//           required: ["num_results", "domain_filter", "sort_by"],
//           additionalProperties: false,
//         },
//       },
//       required: ["query", "options"],
//       additionalProperties: false,
//     },
//   },
// ];

// const response = openai.responses.create({
//   model: "gpt-4o-mini",
//   input: [
//     {
//       role: "user",
//       content:
//         "Can you find information about ChatGPT in the AI knowledge base?",
//     },
//   ],
//   tools,
// });

// console.log(response.output);
