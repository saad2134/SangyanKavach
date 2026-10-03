import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { IntakeCard } from './components/IntakeCard.tsx';
import { VerdictCard } from './components/VerdictCard.tsx';
import { ActionDockets } from './components/ActionDockets.tsx';
import { Footer } from './components/Footer.tsx';
import { analyzeThreatPayload, ThreatAnalysisResult } from './services/verificationEngine.ts';
import { DEMO_SCENARIOS } from './data/demoScenarios.ts';
import { ShieldCheck, Cpu, Award, ShieldAlert, Sparkles, Layers, ArrowUpRight, Terminal } from 'lucide-react';

export const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<ThreatAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initialize with Scenario 1 for immediate live telemetry
  useEffect(() => {
    const defaultScenario = DEMO_SCENARIOS[0];
    handleAnalyze(defaultScenario.rawText, defaultScenario.title);
  }, []);

  const handleAnalyze = async (text: string, title?: string, imageBase64?: string) => {
    setIsAnalyzing(true);
    try {
      await new Promise((r) => setTimeout(r, 450));
      const res = await analyzeThreatPayload({ text, title, sourceContext: imageBase64 });
      setAnalysisResult(res);
    } catch (e) {
      console.error('Analysis failed:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 flex flex-col font-sans bg-grid-pattern selection:bg-cyan-500 selection:text-black">
      
      {/* Cybersecurity Terminal Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Hero Section */}
        <section className="text-center space-y-4 pt-4 pb-2 relative">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span>National Investor Defense & Forensics Node</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Intercept Financial Fraud <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
              Before Capital Moves
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
            Real-time forensic verification of fake SEBI research credentials, counterfeit pre-IPO ISINs, and unauthorized demat transfers. Automated Section 63 BSA 2023 evidence compilation.
          </p>

          {/* High-Tech Telemetry Stats Grid */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4">
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-obsidian-850/80 border border-white/[0.06] text-xs font-mono text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">PERIMETER:</span>
              <span className="font-semibold text-slate-200">160M+ Demat Perimeters</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-obsidian-850/80 border border-white/[0.06] text-xs font-mono text-slate-300">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400">LATENCY:</span>
              <span className="font-semibold text-slate-200">&lt; 450ms TVH Engine</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-obsidian-850/80 border border-white/[0.06] text-xs font-mono text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">STATUTORY:</span>
              <span className="font-semibold text-slate-200">Section 63 BSA 2023</span>
            </div>

          </div>

        </section>

        {/* Console Intake Card */}
        <section>
          <IntakeCard
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />
        </section>

        {/* Diagnostic Telemetry & Actions */}
        {analysisResult && (
          <section className="space-y-8 animate-in fade-in duration-300">
            <VerdictCard result={analysisResult} />
            <ActionDockets result={analysisResult} />
          </section>
        )}

        {/* Architectural Pillars */}
        <section className="pt-8">
          <div className="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Tiered Verification Hierarchy (TVH) Architectural Specifications
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Multi-Layer Defense Matrix
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-xl glass-panel border border-white/[0.06] space-y-2">
              <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Tier 00 // Syntax & Math
              </div>
              <h4 className="text-sm font-bold text-slate-100">
                ISO 6166 ISIN Luhn Mod-10
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Algorithmic check-digit verification on 12-character securities identifiers to intercept bogus pre-IPO and unlisted share allocation frauds.
              </p>
            </div>

            <div className="p-4 rounded-xl glass-panel border border-white/[0.06] space-y-2">
              <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider">
                Tier 01 // Registry Match
              </div>
              <h4 className="text-sm font-bold text-slate-100">
                SEBI Intermediary Triangulation
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Cross-references claimed registration numbers against official master tables to expose identity theft and imposter advisory channels.
              </p>
            </div>

            <div className="p-4 rounded-xl glass-panel border border-white/[0.06] space-y-2">
              <div className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">
                Tier 02 // Banking Perimeter
              </div>
              <h4 className="text-sm font-bold text-slate-100">
                SEBI 2024 Account Mandate
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Enforces the SEBI 2024 circular requiring advisory fees to flow solely into designated corporate current accounts, flagging personal savings handles.
              </p>
            </div>

            <div className="p-4 rounded-xl glass-panel border border-white/[0.06] space-y-2">
              <div className="text-[10px] font-mono uppercase text-rose-400 font-bold tracking-wider">
                Tier 03 // Enforcement
              </div>
              <h4 className="text-sm font-bold text-slate-100">
                1930 Cyber Helpline Prompter
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Direct integration with the National Cyber Crime Reporting Portal providing structured briefing scripts to freeze mule bank accounts in real time.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* Developer Prototype Footer */}
      <Footer />

    </div>
  );
};

export default App;
