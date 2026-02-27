"use client";

import { useState } from "react";
import { useDictionary } from "@/i18n/use-dictionary";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function UrlInput({ onSubmit, loading }: UrlInputProps) {
  const dict = useDictionary();
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && !loading) {
      onSubmit(url.trim());
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      // clipboard permission denied - user can paste manually
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1 flex">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={dict.urlInput.placeholder}
            disabled={loading}
            className="flex-1 px-4 py-3.5 rounded-l-xl sm:rounded-l-xl rounded-r-none border-2 border-r-0 border-white/30 bg-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/60 text-base backdrop-blur-sm disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handlePaste}
            disabled={loading}
            className="px-3 border-2 border-l-0 border-white/30 bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors rounded-r-xl sm:rounded-r-none disabled:opacity-50"
            title={dict.urlInput.paste}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </button>
        </div>
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="px-8 py-3.5 bg-white text-purple-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base shrink-0"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {dict.urlInput.analyzing}
            </span>
          ) : (
            dict.urlInput.download
          )}
        </button>
      </div>
    </form>
  );
}
