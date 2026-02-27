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
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-1.5 border border-white/20 shadow-2xl shadow-purple-900/20">
        <div className="flex flex-col sm:flex-row gap-1.5">
          <div className="relative flex-1 flex">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={dict.urlInput.placeholder}
              disabled={loading}
              className="flex-1 px-5 py-4 rounded-xl bg-white/95 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-base disabled:opacity-50 shadow-sm"
            />
            <button
              type="button"
              onClick={handlePaste}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all disabled:opacity-50"
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
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-fuchsia-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base shrink-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 active:scale-[0.98]"
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
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                {dict.urlInput.download}
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
