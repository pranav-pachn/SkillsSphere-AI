import React, { useCallback, useState } from "react";
import { UploadCloud } from "lucide-react";
import Button from "../../../shared/components/Button";

const DragDropUpload = ({ onFileUpload }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const handleFileInput = useCallback(
    (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setSelectedFile(file);
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const handlePaste = useCallback(
    (e) => {
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === "file") {
          const file = items[i].getAsFile();
          setSelectedFile(file);
          onFileUpload(file);
          break;
        }
      }
    },
    [onFileUpload]
  );

  return (
    <div
      tabIndex="0"
      className={`relative w-full p-8 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out flex flex-col items-center justify-center space-y-4 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
        isDragActive
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-gray-600 bg-dark-bg/50 hover:bg-dark-bg/80 hover:border-gray-500"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onPaste={handlePaste}
    >
      <div className="p-4 rounded-full bg-primary/10 mb-2">
        <UploadCloud className="w-10 h-10 text-primary" />
      </div>
      
      <div className="text-center">
        <p className="text-lg font-medium text-gray-200">
          Drag & Drop your resume here
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Supported formats: PDF, DOCX
        </p>
      </div>

      <div className="my-2 flex items-center justify-center space-x-4 w-full px-12">
        <div className="h-px bg-gray-700 flex-1"></div>
        <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
          OR
        </span>
        <div className="h-px bg-gray-700 flex-1"></div>
      </div>

      <div className="relative">
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf,.doc,.docx"
          onChange={handleFileInput}
          title="Browse file"
        />
        <Button variant="primary">Browse Files</Button>
      </div>

      {selectedFile && (
        <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700 max-w-xs text-center">
          <p className="text-sm font-medium text-primary truncate" title={selectedFile.name}>
            Selected: {selectedFile.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default DragDropUpload;
