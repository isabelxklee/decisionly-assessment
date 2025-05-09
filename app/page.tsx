/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useState } from "react";
import "./globals.css";

// type checking responses from OpenAI
interface ResponseObject {
  merchant: string;
  customer: string;
  evidence: string;
  summary: string;
  purchaseType: string;
  reason: string;
}

export default function Home() {
  const [fileName, setFileName] = useState<string>();
  const [response, setResponse] = useState<ResponseObject | null>();
  const [status, setStatus] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // this function is called if a file is successfully parsed by FilePond
  // sends the file data to OpenAI and then stores the response
  const promptFile = async (fileData: string) => {
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileData }),
    });

    const data = await response.json();
    setLoading(false);
    if (response.ok) {
      setResponse(JSON.parse(data.response));
    } else {
      console.error(data.error);
    }
  };

  // this function is called when a file is uploaded to FilePond
  const processFile = (error: any, file: any) => {
    if (error) {
      console.error("Processing error:", error);
      return;
    }

    try {
      const data = JSON.parse(file.serverId);
      if (data.uploadedFile !== "" && data.parsedText !== "") {
        setStatus(true);
        setFileName(data.fileName);
        promptFile(data.parsedText);
      } else {
        console.log("Error: the returned object is empty");
        setStatus(false);
        setResponse(null);
      }
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
        {!status && <p>🚨 Please upload a different file. 🚨</p>}
      </div>
      <div>
        <h2>Chargeback Representment Info</h2>
        {loading ? (
          <>
            <p>Loading data... beep boop...</p>
          </>
        ) : (
          response && (
            <>
              <label>File name</label>
              {fileName && <p>{fileName}</p>}
              <label>Merchant</label>
              <p>{response.merchant}</p>
              <label>Customer</label>
              <p>{response.customer}</p>
              <label>Purchase type</label>
              <p>{response.purchaseType}</p>
              <label>Summary</label>
              <p>{response.summary}</p>
              <label>Reason Code</label>
              <p>{response.reason}</p>
              <label>Evidence</label>
              <p>{response.evidence}</p>
            </>
          )
        )}
      </div>
    </div>
  );
}
