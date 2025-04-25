/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useState } from "react";
import "./globals.css";

interface ResponseObject {
  merchant: string;
  customer: string;
  evidence: string;
  summary: string;
}

export default function Home() {
  const [fileName, setFileName] = useState<string>();
  const [response, setResponse] = useState<ResponseObject>();

  const promptFile = async (fileData: string) => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileData }),
    });

    const data = await response.json();
    if (response.ok) {
      setResponse(JSON.parse(data.response));
    } else {
      console.error(data.error);
    }
  };

  const processFile = (error: any, file: any) => {
    if (error) {
      console.error("Processing error:", error);
      return;
    }

    try {
      const data = JSON.parse(file.serverId);
      setFileName(data.fileName);
      promptFile(data.parsedText);
    } catch (e) {
      console.error("Failed to parse server response:", e);
    }
  };

  return (
    <div>
      <div>
        <h2>Upload file</h2>
        <FilePond
          server={{
            process: {
              url: "/api/upload",
              method: "POST",
              onload: (res) => {
                return res;
              },
            },
            fetch: null,
            revert: null,
          }}
          onprocessfile={(error, file) => processFile(error, file)}
        />
      </div>
      <div>
        <h2>Chargeback Representment Info</h2>
        {response && (
          <>
            <label>File name</label>
            {fileName && <p>{fileName}</p>}
            <label>Merchant</label>
            <p>{response.merchant}</p>
            <label>Customer</label>
            <p>{response.customer}</p>
            <label>Summary</label>
            <p>{response.summary}</p>
            <label>Evidence</label>
            <p>{response.evidence}</p>
          </>
        )}
      </div>
    </div>
  );
}
