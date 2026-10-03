import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { BentoConsole } from './components/BentoConsole.tsx';
import { Footer } from './components/Footer.tsx';
import { analyzeThreatPayload, ThreatAnalysisResult } from './services/verificationEngine.ts';
import { DEMO_SCENARIOS } from './data/demoScenarios.ts';

export const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<ThreatAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initialize with Scenario 1 for immediate live forensic telemetry
  useEffect(() => {
    const defaultScenario = DEMO_SCENARIOS[0];
    handleAnalyze(defaultScenario.rawText, defaultScenario.title);
  }, []);

  const handleAnalyze = async (text: string, title?: string, imageBase64?: string) => {
    setIsAnalyzing(true);
    try {
      await new Promise((r) => setTimeout(r, 420));
      const res = await analyzeThreatPayload({ text, title, sourceContext: imageBase64 });
      setAnalysisResult(res);
    } catch (e) {
      console.error('Analysis failed:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col font-sans bg-grid-pattern selection:bg-cyan-500 selection:text-black">
      
      {/* Top Navbar with Saad M. attribution and GitHub Link */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        
        {/* Editorial Hero Stage */}
        <HeroSection />

        {/* Unified Magic Bento Console */}
        <BentoConsole
          result={analysisResult}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />

      </main>

      {/* Architectural Developer Footer */}
      <Footer />

    </div>
  );
};

export default App;
