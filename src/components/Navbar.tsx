import React from 'react';
import { Shield, Github, ExternalLink, Activity, Lock, Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#090a0f]/80 backdrop-blur-2xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Identity & Developer Tag */}
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-neutral-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Shield className="w-5 h-5 text-cyan-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base tracking-tight text-white">
                SangyanKavach
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/25 tracking-wider uppercase">
                Prototype v2.4
              </span>
            </div>
            <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-1.5">
              <span>Dev:</span>
              <a
                href="https://github.com/saad2134"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 hover:text-cyan-400 font-medium transition inline-flex items-center gap-0.5"
              >
                Saad M. (@saad2134)
              </a>
            </div>
          </div>
        </div>

        {/* Center Live Telemetry (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-neutral-400">TELEMETRY:</span>
          <span className="text-neutral-200 font-medium">160M+ Demat Perimeters</span>
          <span className="text-neutral-600">|</span>
          <span className="text-cyan-400 font-medium">&lt; 420ms TVH Latency</span>
        </div>

        {/* Right GitHub Repo & Status Link */}
        <div className="flex items-center gap-3">
          
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900/90 border border-white/[0.06] text-[11px] font-mono text-neutral-400">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>DPDP EPHEMERAL</span>
          </div>

          <a
            href="https://github.com/saad2134/SangyanKavach"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 hover:text-white border border-white/[0.08] hover:border-cyan-500/40 transition text-xs font-mono group"
          >
            <Github className="w-4 h-4 text-neutral-300 group-hover:text-cyan-400 transition" />
            <span className="hidden sm:inline">saad2134/SangyanKavach</span>
            <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-cyan-400 transition" />
          </a>

        </div>

      </div>
    </nav>
  );
};
