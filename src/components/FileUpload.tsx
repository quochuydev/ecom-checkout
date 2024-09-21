"use client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function FileUploader({
  children,
  onUpload,
}: {
  children: any;
  onUpload: (fileId: string) => void;
}) {
  const [imageUrl, setImageUrl] = useState<any>(null);

  const onImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      console.warn("no file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/v1/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return;
      }

      const data: { fileId: string; fileUrl: string } = await res.json();

      data.fileId && onUpload(data.fileId);
      setImageUrl(data.fileUrl);
    } catch (error) {
      console.error("something went wrong, check your console.");
    }

    /** Reset file input */
    e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <div>
      {!!imageUrl && (
        <div style={{ maxHeight: 446, overflow: "hidden", width: "100%" }}>
          <Image
            src={imageUrl}
            alt="uploaded image"
            width={720}
            height={446}
            priority={true}
          />
        </div>
      )}
      {!imageUrl && <label htmlFor="file-upload">{children}</label>}
      <input
        style={{ display: "none" }}
        type="file"
        onChange={onImageFileChange}
        id="file-upload"
      />
    </div>
  );
}
