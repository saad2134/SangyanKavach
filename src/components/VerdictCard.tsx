import React, { useState, useEffect } from 'react';
import { ThreatAnalysisResult } from '../services/verificationEngine.ts';
import { voiceAssistant } from '../services/voiceAssistant.ts';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Volume2,
  VolumeX,
  Layers,
  Scale,
  Clock,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Fingerprint
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VerdictCardProps {
  result: ThreatAnalysisResult;
}

export const VerdictCard: React.FC<VerdictCardProps> = ({ result }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    voiceAssistant.setListener((speaking) => {
      setIsPlayingAudio(speaking);
    });

    if (result.verdict === 'SAFE_VERIFIED') {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.7 }
      });
    }

    return () => {
      voiceAssistant.stop();
    };
  }, [result]);

  const handleAudioToggle = () => {
    voiceAssistant.toggle(result.summary);
  };

  const isCritical = result.verdict === 'CRITICAL_SCAM_HAZARD';
  const isSuspicious = result.verdict === 'SUSPICIOUS_ATTENTION';

  const accentColor = isCritical
    ? 'text-rose-400 border-rose-500/30 bg-rose-500/10'
    : isSuspicious
    ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
    : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';

  const panelGlow = isCritical
    ? 'border-rose-500/30 shadow-[0_0_35px_-5px_rgba(244,63,94,0.15)]'
    : isSuspicious
    ? 'border-amber-500/30 shadow-[0_0_35px_-5px_rgba(245,158,11,0.15)]'
    : 'border-emerald-500/30 shadow-[0_0_35px_-5px_rgba(16,185,129,0.15)]';

  return (
    <div className={`glass-panel rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 border ${panelGlow}`}>
      
      {/* Top Threat Telemetry Header */}
      <div className={`p-6 border-b border-white/[0.08] ${
        isCritical ? 'bg-rose-950/20' : isSuspicious ? 'bg-amber-950/20' : 'bg-emerald-950/20'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          
          <div className="flex items-start gap-4">
            <div className={`p-3.5 rounded-xl border ${accentColor} shrink-0`}>
              {isCritical ? (
                <AlertOctagon className="w-8 h-8 text-rose-400" />
              ) : isSuspicious ? (
                <AlertTriangle className="w-8 h-8 text-amber-400" />
              ) : (
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${accentColor}`}>
                  {result.statusBadge}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  DOCKET #{result.bsaEvidenceRecord.docketId}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight text-white">
                {result.headline}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {result.subheadline}
              </p>
            </div>
          </div>

          {/* Threat Meter Dial */}
          <div className="flex items-center gap-4 shrink-0 self-end sm:self-center bg-[#050608]/80 px-5 py-3 rounded-2xl border border-white/[0.08]">
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block tracking-wider">
                Threat Index
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-bold leading-none text-white mt-0.5">
                {result.threatScore}
                <span className="text-xs text-slate-500 font-normal">/100</span>
              </div>
            </div>

            <div className="w-14 h-14 relative flex items-center justify-center">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="4.5" className="text-slate-800/80" fill="transparent" />
                <circle
                  cx="28"
                  cy="28"
                  r="22"
                  stroke="currentColor"
                  strokeWidth="4.5"
                  strokeDasharray={138}
                  strokeDashoffset={138 - (138 * result.threatScore) / 100}
                  strokeLinecap="round"
                  className={isCritical ? 'text-rose-500' : isSuspicious ? 'text-amber-500' : 'text-emerald-500'}
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-xs font-mono font-bold">
                {result.threatScore}%
              </span>
            </div>
          </div>

        </div>

        {/* Forensic Briefing & Voice Player Bar */}
        <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-3xl">
            {result.summary}
          </p>

          <button
            type="button"
            onClick={handleAudioToggle}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition ${
              isPlayingAudio
                ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30'
                : 'bg-white/[0.08] hover:bg-white/[0.14] text-slate-100 border border-white/[0.1]'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>HALT AUDIO BRIEFING</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>PLAY FORENSIC BRIEFING</span>
              </>
            )}
          </button>
        </div>

      </div>

      <div className="p-6 space-y-6">
        
        {/* Entity Forensics Telemetry */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Entity & Depository Verification Telemetry
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Tile 1: Claimed RegNo */}
            <div className="p-3.5 bg-[#050608]/70 border border-white/[0.06] rounded-xl space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                Claimed SEBI RegNo
              </span>
              <div className="font-mono text-sm font-bold text-slate-100 truncate">
                {result.extractedRegNo || 'NOT SPECIFIED'}
              </div>
              <span className={`text-[11px] font-mono block ${
                result.verifiedEntity ? 'text-emerald-400' : 'text-slate-500'
              }`}>
                {result.verifiedEntity ? 'Registered in SEBI Master' : 'Unregistered / Synthetic'}
              </span>
            </div>

            {/* Tile 2: Verified Intermediary Name */}
            <div className="p-3.5 bg-[#050608]/70 border border-white/[0.06] rounded-xl space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                Authentic Intermediary Binding
              </span>
              <div className="font-mono text-sm font-bold text-slate-100 truncate" title={result.claimedEntityName}>
                {result.claimedEntityName || 'UNKNOWN ENTITY'}
              </div>
              <span className="text-[11px] font-mono text-slate-400 truncate block">
                {result.verifiedEntity ? result.verifiedEntity.registeredDomain : 'No Official Domain Binding'}
              </span>
            </div>

            {/* Tile 3: UPI VPA Banking Handle */}
            <div className="p-3.5 bg-[#050608]/70 border border-white/[0.06] rounded-xl space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                Fee Collection Handle (UPI)
              </span>
              <div className="font-mono text-sm font-bold text-slate-100 truncate">
                {result.extractedUpi || 'NO UPI DETECTED'}
              </div>
              {result.extractedUpi && /@(okaxis|paytm|ybl|gpay|oksbi)$/i.test(result.extractedUpi) ? (
                <span className="text-[11px] font-mono text-rose-400 font-semibold block">
                  Violates 2024 Corporate Mandate
                </span>
              ) : (
                <span className="text-[11px] font-mono text-slate-500 block">
                  Designated Gateway Status
                </span>
              )}
            </div>

            {/* Tile 4: Scrip ISIN Verification */}
            <div className="p-3.5 bg-[#050608]/70 border border-white/[0.06] rounded-xl space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                ISO 6166 ISIN Validation
              </span>
              <div className="font-mono text-sm font-bold text-slate-100 truncate">
                {result.extractedIsin || 'NO ISIN SPECIFIED'}
              </div>
              <span className={`text-[11px] font-mono block ${
                result.isinValidation?.valid ? 'text-emerald-400' : result.extractedIsin ? 'text-rose-400 font-bold' : 'text-slate-500'
              }`}>
                {result.isinValidation ? (result.isinValidation.valid ? 'Luhn Mod-10 Verified' : 'Counterfeit Check Digit') : 'N/A'}
              </span>
            </div>

          </div>
        </div>

        {/* Regulatory Violations Feed */}
        {result.regulatoryViolations.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-4 h-4 text-rose-400" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Statutory & Regulatory Breach Feed
              </h3>
            </div>

            <div className="space-y-2.5">
              {result.regulatoryViolations.map((v, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#050608]/60 border border-white/[0.06] rounded-xl flex items-start gap-3"
                >
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 mt-0.5 ${
                    v.severity === 'CRITICAL'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/25'
                      : v.severity === 'WARNING'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                  }`}>
                    {v.code}
                  </span>
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-slate-200">
                      {v.statute}
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed font-sans">
                      {v.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 48-Hour Modus Operandi Threat Progression */}
        {isCritical && (
          <div className="bg-[#050608]/90 border border-amber-500/20 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Behavioral Inoculation // The 48-Hour Scam Modus Operandi
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                Predictive Threat Progression
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {result.modusOperandiSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-obsidian-850/80 border border-white/[0.06] rounded-xl space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-400">
                      {step.timeframe}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {step.phase}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-200">
                    {step.title}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">
                    {step.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
