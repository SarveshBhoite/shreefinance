"use client";

import React, { useRef, useState } from "react";
import { Upload, CheckCircle2, FileText, Trash2, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DocumentUploadState {
    [docKey: string]: {
        fileName: string;
        fileSize: string;
        uploadedAt: string;
        base64?: string;
    };
}

interface LoanDocumentsUploadSectionProps {
    loanName: string;
    documents: string[];
    uploadedDocs: DocumentUploadState;
    onDocumentChange: (updatedDocs: DocumentUploadState) => void;
}

export function LoanDocumentsUploadSection({
    loanName,
    documents,
    uploadedDocs,
    onDocumentChange
}: LoanDocumentsUploadSectionProps) {
    const [uploadingKey, setUploadingKey] = useState<string | null>(null);
    const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    const handleFileSelect = (docKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingKey(docKey);

        const reader = new FileReader();
        reader.onload = () => {
            const sizeInKb = (file.size / 1024).toFixed(1);
            const sizeDisplay = file.size > 1024 * 1024 
                ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
                : `${sizeInKb} KB`;

            const updated = {
                ...uploadedDocs,
                [docKey]: {
                    fileName: file.name,
                    fileSize: sizeDisplay,
                    uploadedAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
                    base64: typeof reader.result === "string" ? reader.result : undefined
                }
            };
            onDocumentChange(updated);
            setUploadingKey(null);
        };

        reader.onerror = () => {
            setUploadingKey(null);
        };

        reader.readAsDataURL(file);
    };

    const handleRemoveFile = (docKey: string) => {
        const updated = { ...uploadedDocs };
        delete updated[docKey];
        onDocumentChange(updated);
        if (fileInputRefs.current[docKey]) {
            fileInputRefs.current[docKey]!.value = "";
        }
    };

    const totalDocs = documents.length;
    const uploadedCount = Object.keys(uploadedDocs).length;

    return (
        <div className="space-y-4 pt-6 border-t border-sky-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <span>📁 Upload Required Documents</span>
                        <span className="text-xs font-bold text-sky-800 bg-sky-50 border border-sky-300 px-2.5 py-0.5 rounded-full">
                            {uploadedCount} / {totalDocs} Attached
                        </span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Upload your KYC and financial verification documents for instant 30-minute sanction dispatch.
                    </p>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 shrink-0">
                    <ShieldCheck className="h-4 w-4 text-[#0284c7]" />
                    <span>256-bit Encrypted & Confidential</span>
                </div>
            </div>

            {/* Document Upload Buttons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {documents.map((docTitle) => {
                    const isUploaded = !!uploadedDocs[docTitle];
                    const docInfo = uploadedDocs[docTitle];
                    const isCurrentlyUploading = uploadingKey === docTitle;

                    return (
                        <div
                            key={docTitle}
                            className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                                isUploaded
                                    ? "bg-sky-50/60 border-sky-300 shadow-sm"
                                    : "bg-white border-sky-200 hover:border-[#0284c7] shadow-xs"
                            }`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1 flex-1">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-xl shrink-0 ${
                                            isUploaded
                                                ? "bg-[#0284c7] text-slate-950"
                                                : "bg-sky-100 text-sky-800"
                                        }`}>
                                            {isUploaded ? <CheckCircle2 className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900 leading-snug">
                                                {docTitle}
                                            </p>
                                            <p className="text-[10px] text-slate-500 font-semibold">
                                                Formats: PDF, JPEG, PNG (Max 10 MB)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Uploaded File Chip */}
                                    {isUploaded && docInfo && (
                                        <div className="mt-2 flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border border-sky-200 text-xs font-bold text-slate-800">
                                            <div className="truncate max-w-[200px] flex items-center gap-1.5 text-[11px] text-emerald-950 font-bold">
                                                <FileText className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                                                <span className="truncate">{docInfo.fileName}</span>
                                                <span className="text-[10px] text-slate-500 font-normal">({docInfo.fileSize})</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile(docTitle)}
                                                className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50 cursor-pointer transition-colors"
                                                title="Remove file"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Hidden file input */}
                            <input
                                ref={(el) => { fileInputRefs.current[docTitle] = el; }}
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                className="hidden"
                                onChange={(e) => handleFileSelect(docTitle, e)}
                            />

                            {/* Action Button */}
                            {!isUploaded && (
                                <div className="pt-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={isCurrentlyUploading}
                                        onClick={() => fileInputRefs.current[docTitle]?.click()}
                                        className="w-full bg-sky-50 hover:bg-[#0284c7] text-sky-900 hover:text-white border-sky-300 font-black h-10 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                                    >
                                        {isCurrentlyUploading ? (
                                            <>
                                                <div className="h-3.5 w-3.5 border-2 border-sky-900 border-t-transparent rounded-full animate-spin" />
                                                <span>Attaching Document...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="h-3.5 w-3.5" />
                                                <span>Click to Upload {docTitle.split(" ")[0]}</span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-2 text-xs text-amber-900 font-semibold">
                <AlertCircle className="h-4 w-4 text-amber-700 shrink-0" />
                <span>
                    Tip: You can proceed now even if you don't have all documents immediately. Our loan verification team will also assist with physical/digital pickup.
                </span>
            </div>
        </div>
    );
}
