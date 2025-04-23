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

    const serverResponse = file.serverId;

    console.log(serverResponse);

    try {
      const parsed = JSON.parse(serverResponse);
      setData(parsed.parsedText);
    } catch (e) {
      console.error("Failed to parse server response:", e);
    }
  };

  return (
    <>
      <FilePond
        server={{
          process: {
            url: "/api/upload",
            method: "POST",
          },
          fetch: null,
          revert: null,
        }}
        onprocessfile={(error, file) => processFile(error, file)}
      />
    </>
  );
}
