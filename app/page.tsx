"use client";

import { useState } from "react";
import { ConfessionForm } from "@/components/confession-form";

export default function Home() {
  const [confession, setConfession] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfessionSubmit = async (validConfession: string) => {
    // Slice 1: Demonstrates form validation and captures the valid confession
    console.log("Validated confession ready for pitch generation:", validConfession);
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] flex flex-col justify-center items-center py-8">
      <ConfessionForm
        confession={confession}
        setConfession={setConfession}
        onSubmit={handleConfessionSubmit}
        isLoading={isLoading}
        error={error}
        setError={setError}
      />
    </main>
  );
}
