/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { FormEvent, useState } from "react";
import "./globals.css";

export default function Home() {
  const [fileData, setFileData] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const [response, setResponse] = useState<string>("");

  const processFile = (error: any, file: any) => {
    if (error) {
      console.error("Processing error:", error);
      return;
    }

    try {
      const parsed = JSON.parse(file.serverId);
      setFileName(parsed.fileName);
      setFileData(parsed.parsedText);
    } catch (e) {
      console.error("Failed to parse server response:", e);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileData }),
    });

    const data = await response.json();
    console.log("data", data.response);
    if (response.ok) {
      setResponse(data.response);
    } else {
      console.error(data.error);
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
        <h2>File information</h2>
        {fileData && (
          <>
            <div>
              <h3>Title</h3>
              <p>{fileName}</p>
            </div>
            <h3>Chargeback Representment Info</h3>
          </>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Generate Summary</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
