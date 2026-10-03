import React from 'react';
import { ShieldAlert, Cpu, Award, ArrowUpRight, Terminal, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-10 pb-8 text-center overflow-hidden">
      
      {/* Background Radial Glow Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-cyan-400 mb-5 shadow-[0_0_20px_rgba(6,182,212,0.12)]">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span className="tracking-wide uppercase text-[11px]">
          Public Investor Resilience & Scam Interception Terminal
        </span>
      </div>

      {/* Editorial Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08] max-w-5xl mx-auto">
        Intercept Financial Fraud <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
          Before Capital Moves.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-5 text-sm sm:text-base lg:text-lg text-neutral-400 max-w-3xl mx-auto font-sans leading-relaxed">
        Real-time forensic verification of forged SEBI credentials, counterfeit pre-IPO ISINs, and illegal guaranteed return vectors. Generates court-admissible Section 63 BSA 2023 evidence dossiers in sub-second latency.
      </p>

      {/* Flowing Shimmering Bottom Accent Line (Inspired by Attenomy) */}
      <div className="relative mt-8 max-w-4xl mx-auto">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
        <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent -mt-[1px] animate-pulse" />
      </div>

    </section>
  );
};
