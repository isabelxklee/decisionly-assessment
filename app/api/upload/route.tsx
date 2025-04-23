/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();
  const uploadedFiles = formData.getAll("filepond");

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[1];
    console.log("Uploaded file:", uploadedFile);

    if (uploadedFile instanceof File) {
      const fileName = uuidv4();
      const tempFilePath = `/tmp/${fileName}.pdf`;
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
      await fs.writeFile(tempFilePath, fileBuffer);

      try {
        const parsedText: string = await new Promise((resolve, reject) => {
          const pdfParser = new (PDFParser as any)(null, 1);

          pdfParser.on("pdfParser_dataError", (errData: any) => {
            console.log(errData.parserError);
            reject(errData.parserError);
          });

          pdfParser.on("pdfParser_dataReady", () => {
            const text = (pdfParser as any).getRawTextContent();
            console.log("Parsed text:", text);
            resolve(text);
          });

          pdfParser.loadPDF(tempFilePath);
        });

        return NextResponse.json({
          parsedText,
          fileName,
        });
      } catch (error) {
        console.error("Upload failed: ", error);
      }
    } else {
      console.log("Uploaded file is not in the correct format.");
    }
  } else {
    console.log("No files found.");
  }

  return NextResponse.json({
    parsedtext: "",
    fileName: "",
  });
}
