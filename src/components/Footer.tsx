import React from 'react';
import { Shield, Lock, Terminal, Github, ExternalLink, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-white/[0.08] bg-[#050608]/90 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Developer Attribution Card */}
        <div className="p-6 rounded-2xl bg-[#0b0d13] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Developer Prototype Release
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-xs font-mono text-neutral-400">
                v2.4 Production Candidate
              </span>
            </div>
            <div className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
              <span>Engineered by</span>
              <a
                href="https://github.com/saad2134"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 font-bold underline underline-offset-4 decoration-cyan-500/40 hover:decoration-cyan-400 transition"
              >
                Saad M. (@saad2134)
              </a>
            </div>
            <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">
              Designed as a sovereign public-good defensive utility to protect retail investors from financial fraud, unregistered finfluencers, and pre-IPO allocation traps.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://github.com/saad2134/SangyanKavach"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 hover:text-white border border-white/[0.1] hover:border-cyan-500/40 transition text-xs font-mono flex items-center gap-2 group"
            >
              <Github className="w-4 h-4 text-neutral-400 group-hover:text-cyan-400 transition" />
              <span>saad2134/SangyanKavach</span>
              <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-cyan-400 transition" />
            </a>
          </div>

        </div>

        {/* Regulatory Disclaimers & IP */}
        <div className="text-center text-[11px] text-neutral-500 max-w-3xl mx-auto space-y-2 leading-relaxed">
          <p>
            Statutory Notice: SangyanKavach provides zero stock tips, investment advice, or buy/sell recommendations. This developer prototype conducts heuristic discrepancy audits against public regulatory registries solely for public-good awareness and pre-transaction interception.
          </p>
          <div className="text-[10px] font-mono text-neutral-600">
            © 2026 SangyanKavach • Developed by Saad M. • Source code licensed for public investor protection.
          </div>
        </div>

      </div>
    </footer>
  );
};
