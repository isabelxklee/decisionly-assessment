/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

export default function Home() {
  const [files, setFiles] = useState<any[]>([]);

  console.log(files);

  return (
    <>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={3}
        server="/api"
        name="files" /* sets the file input name, it's filepond by default */
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </>
  );
}
