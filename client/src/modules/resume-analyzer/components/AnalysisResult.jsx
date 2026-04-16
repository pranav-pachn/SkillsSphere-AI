import React from "react";
import { CheckCircle2, ChevronRight, AlertCircle, Sparkles } from "lucide-react";

const AnalysisResult = ({ result, onReset }) => {
  const { score, suggestions, missing_keywords } = result;

  // Determine score color
  const getScoreColor = (s) => {
    if (s >= 80) return "text-green-400";
    if (s >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header / Score Section */}
      <div className="bg-dark-bg/60 border border-gray-700 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-100">Analysis Complete</h2>
            <p className="text-gray-400 text-sm">We've analyzed your resume against industry standards.</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <span className={`text-5xl font-extrabold tracking-tighter ${getScoreColor(score)}`}>
            {score}%
          </span>
          <span className="text-xs font-bold uppercase text-gray-500 mt-1 tracking-widest">
            Overall Score
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Suggestions Section */}
        <div className="bg-dark-bg/40 border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-gray-200">Key Suggestions</h3>
          </div>
          <ul className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-3 group">
                <ChevronRight className="w-4 h-4 mt-1 text-primary shrink-0 transition-transform group-hover:translate-x-1" />
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
                className="px-3 py-1.5 bg-gray-800 border border-gray-700 hover:border-primary/50 text-gray-300 rounded-full text-xs font-medium transition-colors cursor-default"
              >
                {keyword}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            * Adding these keywords to your resume can significantly improve your ATS ranking for target roles.
          </p>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="text-gray-400 hover:text-primary underline text-sm font-medium transition-colors"
        >
          Upload another resume
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;
