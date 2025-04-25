/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import PDFParser from "pdf2json";

export async function POST(req: NextRequest) {
  // uploaded file from FilePond
  const formData: FormData = await req.formData();
  const uploadedFiles = formData.getAll("filepond");

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[1];
    console.log("Uploaded file:", uploadedFile);

    // if the uploaded file is valid
    if (uploadedFile instanceof File) {
      // if the uploaded file is a PDF
      if (uploadedFile.type == "application/pdf") {
        // create a temporary file to read and store the uploaded file data
        const fileName = uploadedFile.name;
        const tempFilePath = `/tmp/${fileName}.pdf`;
        const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
        await fs.writeFile(tempFilePath, fileBuffer);

        // try parsing the file data
        try {
          const parsedText: string = await new Promise((resolve, reject) => {
            const pdfParser = new (PDFParser as any)(null, 1);

            pdfParser.on("pdfParser_dataError", (errData: any) => {
              console.log(errData.parserError);
              reject(errData.parserError);
            });

            // extract the text data from the PDF
            pdfParser.on("pdfParser_dataReady", () => {
              const text = (pdfParser as any).getRawTextContent();
              resolve(text);
            });

            pdfParser.loadPDF(tempFilePath);
          });

          // return the response as JSON
          return NextResponse.json({
            parsedText,
            fileName,
          });
        } catch (error) {
          console.error("Upload failed: ", error);
        }
      } else {
        console.log(
          `File Type Error: The uploaded file type is ${uploadedFile.type}. Please upload a PDF instead.`
        );
      }
    } else {
      console.log("Error: The uploaded file is not in the correct format.");
    }
  } else {
    console.log("Error: No files were found.");
  }

  // if all else fails, return JSON with empty values
  return NextResponse.json({
    parsedtext: "",
    uploadedFile: "",
  });
}
