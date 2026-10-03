import React from 'react';
import { Shield, Lock, Terminal, Code2, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/[0.08] bg-[#050608]/90 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Core Prototype Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-slate-200 tracking-wider uppercase">
                Developer Prototype Release // Standalone Build
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Engineered by independent developer for public investor protection, fraud interception, and financial resilience.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Zero Data Retention</span>
            </div>
            <span className="text-slate-700">•</span>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Non-Commercial Public Utility</span>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimers & IP */}
        <div className="text-center text-[11px] font-sans text-slate-500 leading-relaxed max-w-4xl mx-auto space-y-1.5 pt-2">
          <p>
            Statutory Notice: SangyanKavach provides zero stock tips, investment advice, or buy/sell recommendations. This developer prototype conducts heuristic discrepancy audits against public regulatory registries solely for public-good awareness.
          </p>
          <p className="text-slate-600 font-mono text-[10px]">
            © 2026 SangyanKavach • Built by Independent Developer • Cross-referenced against official SEBI, NSDL, and RBI registries.
          </p>
        </div>

      </div>
    </footer>
  );
};
