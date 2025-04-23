/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<string>();

  const processFile = (error: any, file: any) => {
    if (error) {
      console.error("Processing error:", error);
      return;
    }

    console.log("file server id: ", file.serverId);

    try {
      const parsed = JSON.parse(file.serverId);
      console.log("parsed: ", parsed);
      setData(parsed.parsedText);
    } catch (e) {
      console.error("Failed to parse server response:", e);
    }
  };

  console.log("data: ", data);

  return (
    <>
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
    </>
  );
}
