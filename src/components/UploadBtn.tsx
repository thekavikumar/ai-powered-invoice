'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FileUp, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export function UploadBtn() {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<(string | null)[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // Define supported formats and maximum file size
  const SUPPORTED_FORMATS = [
    'image/png',
    'image/jpeg',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ]; // .pdf, .png, .jpg, .xlsx
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      processFiles(uploadedFiles);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const processFiles = (newFiles: File[]) => {
    const validFiles: File[] = [];
    const errorMsgs: string[] = [];

    newFiles.forEach((file) => {
      if (!SUPPORTED_FORMATS.includes(file.type)) {
        errorMsgs.push(`Unsupported format: ${file.name}`);
      } else if (file.size > MAX_FILE_SIZE) {
        errorMsgs.push(`File too large (max 5MB): ${file.name}`);
      } else {
        validFiles.push(file);
      }
    });

    const mergedFiles = mergeFiles(files, validFiles);
    setFiles(mergedFiles);
    generateFilePreviews(mergedFiles);

    // Clear error messages if valid files are uploaded
    if (mergedFiles.length > 0) {
      setErrorMessages([]);
    } else {
      setErrorMessages(errorMsgs);
    }
  };

  const mergeFiles = (currentFiles: File[], newFiles: File[]) => {
    const currentFileNames = new Set(currentFiles.map((file) => file.name));
    const uniqueFiles = newFiles.filter(
      (file) => !currentFileNames.has(file.name)
    );
    return [...currentFiles, ...uniqueFiles];
  };

  const generateFilePreviews = (fileList: File[]) => {
    const previews = fileList.map((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string | null>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => resolve(null);
        });
      }
      return Promise.resolve(null);
    });

    Promise.all(previews).then(setFilePreviews);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...filePreviews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setFiles(newFiles);
    setFilePreviews(newPreviews);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-4 font-medium text-gray-600 py-2 border shadow-sm border-gray-800 hover:shadow-md hover:scale-105 duration-200 rounded-full text-sm flex items-center gap-2">
          <FileUp size={20} />
          Upload Files
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Drag and drop your files here or click on the area to select files.
          </DialogDescription>
        </DialogHeader>
        <label
          htmlFor="file-upload"
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center block cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p className="text-gray-600 mb-4">
            Drag and drop files here <br /> or <br /> click on this area to
            select files <br />
            <span className="text-sm text-gray-400">
              (Supported formats: .pdf, .png, .jpg, .xlsx)
            </span>
          </p>
          <input
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        {errorMessages.length > 0 && files.length === 0 && (
          <div className="mt-4 text-red-500">
            {errorMessages.map((msg, index) => (
              <p key={index} className="text-sm">
                {msg}
              </p>
            ))}
          </div>
        )}
        {files.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold">Selected Files:</p>
            <ul className="grid grid-cols-2 gap-4">
              {files.map((file, index) => (
                <li key={index} className="flex items-center gap-2">
                  {filePreviews[index] ? (
                    <Image
                      src={filePreviews[index]!}
                      alt={file.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded">
                      <span className="text-xs text-gray-600">
                        {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                      </span>
                    </div>
                  )}
                  <span className="text-sm truncate">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <DialogFooter>
          <Button
            onClick={() => {
              console.log('Files to upload:', files);
              // Trigger upload logic here
            }}
          >
            Upload Files
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
