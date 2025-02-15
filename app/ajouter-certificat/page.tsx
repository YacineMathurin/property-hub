"use client";
import React, { useState } from "react";
import { Upload, Download, File, Video, Loader2, Check, X } from "lucide-react";
// Using shadcn/ui Select component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DocumentUpload {
  file: File | null;
  progress: number;
  status: "idle" | "uploading" | "completed" | "error";
  downloadUrl?: string;
}

interface DocumentState {
  ilot?: DocumentUpload;
  parcel?: DocumentUpload;
  identite: DocumentUpload;
  video: DocumentUpload;
}

const createInitialState = (
  documentType: "ilot" | "parcel"
): DocumentState => ({
  [documentType]: { file: null, progress: 0, status: "idle" },
  identite: { file: null, progress: 0, status: "idle" },
  video: { file: null, progress: 0, status: "idle" },
});

const DocumentManager = () => {
  const [documentType, setDocumentType] = useState<"ilot" | "parcel">("ilot");
  const [documents, setDocuments] = useState<DocumentState>(
    createInitialState("ilot")
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDocumentTypeChange = (value: "ilot" | "parcel") => {
    setDocumentType(value);
    setDocuments(createInitialState(value));
  };

  const handleFileSelect =
    (type: keyof DocumentState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setDocuments((prev) => ({
          ...prev,
          [type]: {
            file,
            progress: 0,
            status: "idle",
          },
        }));
      }
    };

  const removeFile = (type: keyof DocumentState) => {
    setDocuments((prev) => ({
      ...prev,
      [type]: { file: null, progress: 0, status: "idle" },
    }));
  };

  const simulateUpload = async (type: keyof DocumentState) => {
    setDocuments((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        status: "uploading",
      },
    }));

    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setDocuments((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          progress,
        },
      }));
    }

    setDocuments((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        status: "completed",
        downloadUrl: `https://example.com/download/${type}/${prev[type]?.file?.name}`,
      },
    }));
  };

  const handleUploadAll = async () => {
    setIsUploading(true);
    const types = Object.keys(documents) as Array<keyof DocumentState>;
    try {
      await Promise.all(
        types.map((type) =>
          documents[type]?.file && documents[type]?.status === "idle"
            ? simulateUpload(type)
            : Promise.resolve()
        )
      );
    } catch (error) {
      console.error("Upload failed:", error);
    }
    setIsUploading(false);
  };

  const allFilesSelected = Object.entries(documents).every(
    ([_, doc]) => doc?.file !== null
  );

  const allDocumentsUploaded = Object.entries(documents).every(
    ([_, doc]) => doc?.status === "completed"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allDocumentsUploaded) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setDocuments(createInitialState(documentType));
  };

  const documentTitles = {
    ilot: "Ilot Document*",
    parcel: "Parcel Document*",
    identite: "Identité Document*",
    video: "Video Document*",
  };

  const renderFileUpload = (type: keyof DocumentState) => {
    if (!documents[type]) return null;

    return (
      <div key={type} className="border rounded-lg p-6 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          {documentTitles[type]}
        </h2>

        <div className="space-y-4">
          {!documents[type].file ? (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor={`${type}-upload`}
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-white hover:bg-slate-100 border-slate-300"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {type === "video" ? (
                    <Video className="w-8 h-8 text-slate-500 mb-2" />
                  ) : (
                    <Upload className="w-8 h-8 text-slate-500 mb-2" />
                  )}
                  <p className="text-sm text-slate-500">
                    <span className="font-medium">Click to upload</span> or drag
                    and drop
                  </p>
                  <p className="text-xs text-slate-500">
                    {type === "video"
                      ? "MP4, MOV, AVI (Max 100MB)"
                      : "PDF, DOC, DOCX (Max 10MB)"}
                  </p>
                </div>
                <input
                  id={`${type}-upload`}
                  type="file"
                  className="hidden"
                  accept={
                    type === "video" ? ".mp4,.mov,.avi" : ".pdf,.doc,.docx"
                  }
                  onChange={handleFileSelect(type)}
                />
              </label>
            </div>
          ) : (
            <div className="flex items-center p-4 bg-white rounded-lg">
              {type === "video" ? (
                <Video className="w-6 h-6 text-slate-500 mr-3" />
              ) : (
                <File className="w-6 h-6 text-slate-500 mr-3" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {documents[type].file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {(documents[type].file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {documents[type].status === "completed" ? (
                <Check className="w-5 h-5 text-green-500 mr-2" />
              ) : documents[type].status === "uploading" ? (
                <div className="w-16">
                  <p className="text-xs text-slate-600">
                    {documents[type].progress}%
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => removeFile(type)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4 md:mb-0">
              Document Manager
            </h1>
            <Select
              value={documentType}
              onValueChange={handleDocumentTypeChange}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ilot">Ilot Document</SelectItem>
                <SelectItem value="parcel">Parcel Document</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {renderFileUpload(documentType)}
              {renderFileUpload("identite")}
              {renderFileUpload("video")}
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={handleUploadAll}
                disabled={
                  !allFilesSelected || isUploading || allDocumentsUploaded
                }
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Uploading Files...
                  </span>
                ) : (
                  "Upload All Files"
                )}
              </button>

              <button
                type="submit"
                disabled={!allDocumentsUploaded || isSubmitting}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </span>
                ) : (
                  "Submit Documents"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;
