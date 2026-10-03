import React from 'react';
import { Shield, ShieldAlert, Cpu, Lock, Terminal, Activity } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/[0.08] bg-[#07080c]/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Shield className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                SangyanKavach
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/25 tracking-wider">
                Developer Prototype
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight">
              Investor Security & Forensic Verification Terminal
            </p>
          </div>
        </div>

        {/* Status Indicators & Metadata */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Live Node Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-white/[0.06] text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-slate-400">NODE:</span>
            <span className="text-emerald-400 font-semibold">ONLINE // REGISTRY V4.2</span>
          </div>

          {/* Privacy Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-white/[0.06] text-[11px] font-mono text-slate-400">
            <Lock className="w-3 h-3 text-cyan-400" />
            <span>DPDP 2023 EPHEMERAL</span>
          </div>

          {/* Core Engine Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-200 font-medium">TVH ENGINE</span>
          </div>

        </div>

      </div>
    </header>
  );
};
