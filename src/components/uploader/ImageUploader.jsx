import { useEffect, useRef, useState } from "react";
import * as LR from "@uploadcare/blocks";
import blocksStyles from "@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url";

LR.registerBlocks(LR);

export const ImageUploader = () => {
  const [files, setFiles] = useState([]);
  const ctxProviderRef = useRef(null);

  useEffect(() => {
    const ctxProvider = ctxProviderRef.current;
    if (!ctxProvider) return;

    const handleChangeEvent = (e) => {
      console.log("change event payload: ", e);
      setFiles([...e.detail.allEntries.filter((f) => f.status === "success")]);
    };

    ctxProvider.addEventListener("change", handleChangeEvent);
    return () => {
      ctxProvider.removeEventListener("change", handleChangeEvent);
    };
  }, [setFiles]);

  return (
    <div>
      <lr-config
        ctx-name="my-uploader"
        pubkey={import.meta.env.VITE_REACT_APP_UPLOADCARE_PUBLIC_KEY}
        sourceList="local, url, camera, dropbox"
        removeCopyright={true}
        confirmUpload={false}
      ></lr-config>
      <lr-file-uploader-regular
        ctx-name="my-uploader"
        // css-src={blocksStyles}
        css-src={blocksStyles}
      ></lr-file-uploader-regular>
      <lr-upload-ctx-provider
        ctx-name="my-uploader"
        ref={ctxProviderRef}
      ></lr-upload-ctx-provider>

      <div className="previews">
        {files.map((file) => (
          <div key={file.uuid} className="previewWrapper">
            <img
              className="previewImage"
              key={file.uuid}
              src={`${file.cdnUrl}/-/preview/-/resize/x400/`}
              width="200"
              height="200"
              alt={file.fileInfo.originalFilename || ""}
              title={file.fileInfo.originalFilename || ""}
            />

            <p className="previewData">{file.fileInfo.originalFilename}</p>

            <p className="previewData">{formatSize(file.fileInfo.size)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

function formatSize(bytes) {
  if (!bytes) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}
