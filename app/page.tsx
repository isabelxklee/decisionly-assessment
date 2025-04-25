/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useState } from "react";
import "./globals.css";

export default function Home() {
  const [data, setData] = useState<string>();
  const [fileName, setFileName] = useState<string>();

  const processFile = (error: any, file: any) => {
    if (error) {
      console.error("Processing error:", error);
      return;
    }

    console.log("file server id: ", file.serverId);

    try {
      const parsed = JSON.parse(file.serverId);
      setFileName(parsed.fileName);
      setData(parsed.parsedText);
    } catch (e) {
      console.error("Failed to parse server response:", e);
    }
  };

  console.log("data: ", data);

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
        {data && (
          <>
            <h3>Title</h3>
            <p>{fileName}</p>
          </>
        )}
      </div>
    </div>
  );
}
