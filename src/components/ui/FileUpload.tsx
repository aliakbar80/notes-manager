import React, { useState } from "react";

type FileUploadProps = {
  onUpload: (file: File) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onUpload(selectedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      onUpload(droppedFile);
    }
  };

  return (
    <div
      className={`flex flex-col items-center border p-4 rounded-lg transition-all ${
        dragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
      <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg">
        انتخاب فایل یا کشیدن و رها کردن فایل اینجا
      </label>
      {file && <p className="mt-2 text-sm">{file.name}</p>}
    </div>
  );
};

export default FileUpload;