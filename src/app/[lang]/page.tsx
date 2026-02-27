"use client";

import { useState } from "react";
import type { ExtractedPost, ExtractResponse } from "@/types/instagram";
import { useDictionary } from "@/i18n/use-dictionary";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ResultsSection from "@/components/ResultsSection";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import HowToUse from "@/components/HowToUse";
import FAQ from "@/components/FAQ";
import ToolsPromo from "@/components/ToolsPromo";
import Footer from "@/components/Footer";

export default function Home() {
  const dict = useDictionary();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExtractedPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (url: string) => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data: ExtractResponse = await response.json();

      if (data.success && data.data) {
        setResult(data.data);
      } else {
        setError(data.error || dict.errors.unknown);
      }
    } catch {
      setError(dict.errors.network);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero onSubmit={handleSubmit} loading={loading} />

        {loading && <LoadingSpinner />}

        {error && (
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        )}

        {result && <ResultsSection result={result} />}

        <HowToUse />
        <FAQ />
        <ToolsPromo />
      </main>
      <Footer />
    </div>
  );
}
