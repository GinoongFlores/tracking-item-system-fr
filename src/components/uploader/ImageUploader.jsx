import { useEffect, useRef, useState } from "react";
import * as LR from "@uploadcare/blocks";
import blocksStyles from "@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url";

LR.registerBlocks(LR);

/*
* On laravel back-end for deleting an image

<?php
use Illuminate\Support\Facades\Http;

function deleteFile($uuid) {
    $url = "https://api.uploadcare.com/files/{$uuid}/storage/";
    $response = Http::withHeaders([
        'Authorization' => 'Uploadcare.Simple your_public_key:your_private_key'
    ])->delete($url);

    if ($response->successful()) {
        return response('File deleted successfully', 200);
    } else {
        return response('Failed to delete file', 500);
    }
}
?>

*/

export const ImageUploader = ({ onUpload }) => {
  const [files, setFiles] = useState([]);
  const ctxProviderRef = useRef(null);

  useEffect(() => {
    const ctxProvider = ctxProviderRef.current;
    if (!ctxProvider) return;

    const handleChangeEvent = (e) => {
      console.log("change event payload: ", e);
      const successfulFiles = e.detail.allEntries.filter(
        (f) => f.status === "success"
      );
      setFiles(successfulFiles); // update the state with the new files array

      // call the onUpload prop with the UUIDs of the upload files. This only upload one uuid of image

      // successfulFiles.forEach((file) => onUpload(file.uuid));

      // upload multiple uuid of images
      const uuids = successfulFiles.map((file) => file.uuid);
      onUpload(uuids);
    };

    ctxProvider.addEventListener("change", handleChangeEvent);
    return () => {
      ctxProvider.removeEventListener("change", handleChangeEvent);
    };
  }, [setFiles, onUpload]);

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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 w-full mt-5 max-w-[400px] md:max-w-[600px]  place-items-center">
        {files.map((file) => (
          <div
            key={file.uuid}
            className="relative w-full sm:w-48 bg-white dark:bg-gray-600 text-black dark:text-white rounded-lg p-4 flex flex-col items-center h-full"
          >
            <div className="w-full h-56 relative">
              <img
                className="absolute top-0 left-0 w-full h-full object-contain rounded-md mb-2"
                key={file.uuid}
                src={`${file.cdnUrl}/-/preview/-/resize/x400/`}
                alt={file.fileInfo.originalFilename || ""}
                title={file.fileInfo.originalFilename || ""}
              />
            </div>

            {/* description */}
            <div className="max-h-full max-w-full overflow-auto">
              <p className="m-0 leading-normal text-sm  whitespace-nowrap w-48 overflow-ellipsis">
                {file.fileInfo.originalFilename}
              </p>

              <p className="m-0 leading-normal text-sm  whitespace-nowrap w-48 overflow-ellipsis">
                {formatSize(file.fileInfo.size)}
              </p>
            </div>
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
