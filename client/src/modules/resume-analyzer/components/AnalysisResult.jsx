import React, { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight, AlertCircle, Sparkles, FileText, Download, Eye } from "lucide-react";

const AnalysisResult = ({ result, file, onReset }) => {
  const { score, suggestions, missing_keywords } = result;
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  // Determine score color
  const getScoreColor = (s) => {
    if (s >= 80) return "text-green-400";
    if (s >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const isPDF = file?.type === "application/pdf";
  
  // Helper for short extension names
  const getFileExtension = () => {
    if (file?.name.endsWith(".docx")) return "DOCX";
    if (file?.name.endsWith(".pdf")) return "PDF";
    return file?.type?.split("/")[1]?.toUpperCase() || "FILE";
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Persistent File Status Pill */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <p className="text-xs font-semibold text-green-400">
            {file?.name || "Resume"} analyzed successfully
          </p>
        </div>
      </div>

      {/* Header / Score Section */}
      <div className="bg-dark-bg/60 border border-gray-700 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 ring-1 ring-primary/10 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-100">Analysis Complete</h2>
            <p className="text-gray-400 text-sm">We've analyzed your resume against industry standards.</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <span className={`text-5xl font-extrabold tracking-tighter drop-shadow-sm ${getScoreColor(score)}`}>
            {score}%
          </span>
          <span className="text-xs font-bold uppercase text-gray-500 mt-1 tracking-widest">
            Overall Score
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Suggestions & Keywords */}
        <div className="lg:col-span-7 space-y-6">
          {/* Suggestions Section */}
          <div className="bg-dark-bg/40 border border-gray-700/50 rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-200">Key Suggestions</h3>
            </div>
            <ul className="space-y-4 flex-1">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="mt-1 bg-primary/10 border border-primary/20 rounded p-0.5 group-hover:bg-primary/20 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{suggestion}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Missing Keywords Section */}
          <div className="bg-dark-bg/40 border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-200">Missing Keywords</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {missing_keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gray-800/80 border border-gray-700 hover:border-primary/50 text-gray-300 rounded-full text-xs font-medium transition-all hover:bg-gray-700 cursor-default"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-gray-500 mt-4 leading-relaxed italic">
              * Strategic placement of these keywords can improve your ATS visibility.
            </p>
          </div>
        </div>

        {/* Right Column: Document Preview */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <div className="bg-dark-bg/40 border border-gray-700/50 rounded-2xl p-5 flex flex-col h-full min-h-[500px] shadow-sm">
            <div className="flex items-center justify-between mb-5 px-1 overflow-hidden">
              <div className="flex items-center gap-2 shrink-0">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-semibold text-gray-200">Resume Preview</h3>
              </div>
              <div className="flex-1 flex justify-end overflow-hidden ml-4">
                <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-md border border-primary/30 font-bold tracking-tight truncate">
                  {getFileExtension()}
                </span>
              </div>
            </div>

            <div className="flex-1 bg-[#0f141a] rounded-xl border border-gray-800 overflow-hidden relative group shadow-inner">
              {isPDF && previewUrl ? (
                <embed
                  src={previewUrl}
                  type="application/pdf"
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
                  <div className="p-5 bg-gray-800/80 rounded-2xl border border-gray-700/50 mb-4 shadow-xl">
                    <FileText className="w-16 h-16 text-primary/60" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-gray-200 truncate max-w-[200px]" title={file?.name}>
                      {file?.name}
                    </p>
                    <p className="text-xs text-gray-500 max-w-[220px] mx-auto leading-relaxed">
                      Instant preview is currently optimized for <span className="text-primary/80 font-semibold">PDFs</span>. 
                      You can still download or edit your file below.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Global Overlay for Download */}
              <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                 <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-full shadow-2xl hover:scale-105 transition-transform">
                    <Download className="w-4 h-4" />
                    Download File
                 </button>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between px-1">
              <p className="text-[10px] text-gray-500 font-medium tracking-wide italic">
                {new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                Size: {(file?.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="group flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm font-medium"
        >
          <div className="p-1.5 border border-gray-700 rounded-lg group-hover:border-primary/50 transition-colors">
            <Eye className="w-4 h-4" />
          </div>
          <span className="underline decoration-transparent group-hover:decoration-primary transition-all">
            Upload another resume
          </span>
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;
