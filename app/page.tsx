/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>();

  console.log(data);

  return (
    <>
      <FilePond
        onupdatefiles={(file) => setData(file)}
        server={{
          process: "/api/upload",
          fetch: null,
          revert: null,
        }}
      />
    </>
  );
}
