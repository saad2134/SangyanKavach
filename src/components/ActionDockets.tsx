import React, { useState } from 'react';
import { ThreatAnalysisResult } from '../services/verificationEngine.ts';
import { generateBsa2023PdfDocket } from '../services/pdfDocketGenerator.ts';
import {
  PhoneCall,
  FileDown,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  Lock,
  FileCode,
  Terminal,
  Zap
} from 'lucide-react';

interface ActionDocketsProps {
  result: ThreatAnalysisResult;
}

export const ActionDockets: React.FC<ActionDocketsProps> = ({ result }) => {
  const [copiedPrompter, setCopiedPrompter] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const fullPrompterText = `1. ${result.telephonicPrompter.step1}\n2. ${result.telephonicPrompter.step2}\n3. ${result.telephonicPrompter.step3}`;

  const handleCopyPrompter = () => {
    navigator.clipboard.writeText(fullPrompterText);
    setCopiedPrompter(true);
    setTimeout(() => setCopiedPrompter(false), 2000);
  };

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      generateBsa2023PdfDocket(result);
    } catch (e) {
      console.error('PDF compilation failed:', e);
      alert('Error compiling forensic evidence PDF.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      
      {/* Console 1: Emergency Cybercrime 1930 Helpline */}
      <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-rose-400">
                Immediate Intervention // 1930 Cyber Helpline
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 font-bold border border-rose-500/25">
              TOLL-FREE: 1930
            </span>
          </div>

          <h3 className="text-base font-display font-bold text-white mb-1.5">
            National Cyber Crime Dispatch Script
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            If funds have already been dispatched, call <span className="text-white font-bold font-mono">1930</span> immediately to trigger emergency bank account lien freezes. Read these exact three lines to the police operator:
          </p>

          {/* Structured Briefing Terminal */}
          <div className="bg-[#050608] border border-white/[0.08] rounded-xl p-4 space-y-3 font-mono text-xs">
            
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-white/[0.06] text-cyan-400 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                01
              </span>
              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                {result.telephonicPrompter.step1}
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-white/[0.06] text-cyan-400 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                02
              </span>
              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                {result.telephonicPrompter.step2}
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-white/[0.06] text-cyan-400 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                03
              </span>
              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                {result.telephonicPrompter.step3}
              </p>
            </div>

          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
          <a
            href="tel:1930"
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-mono font-bold text-xs text-center flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition tracking-wider uppercase"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Connect to 1930</span>
          </a>

          <button
            type="button"
            onClick={handleCopyPrompter}
            className="py-2.5 px-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 font-mono text-xs flex items-center gap-1.5 border border-white/[0.08] transition"
          >
            {copiedPrompter ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPrompter ? 'Copied' : 'Copy Script'}</span>
          </button>
        </div>
      </div>

      {/* Console 2: Section 63 BSA 2023 Forensic Evidence Docket */}
      <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400">
                Statutory Redressal // Section 63 BSA 2023
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/25">
              {result.redressalChannel === 'CHANNEL_A_CYBERCRIME_1930' ? 'Channel A: Imposters' : 'Channel B: SCORES 2.0'}
            </span>
          </div>

          <h3 className="text-base font-display font-bold text-white mb-1.5">
            Cryptographic Electronic Evidence Docket
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Certified under Section 63 of Bharatiya Sakshya Adhiniyam, 2023 (formerly Section 65B of Indian Evidence Act) with client-side SHA-256 digest:
          </p>

          <div className="bg-[#050608] border border-white/[0.08] rounded-xl p-4 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 uppercase text-[10px]">Docket Reference</span>
              <span className="text-slate-200 font-bold">#{result.bsaEvidenceRecord.docketId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 uppercase text-[10px]">SHA-256 Digest</span>
              <span className="text-cyan-400 text-[11px] truncate max-w-[220px]" title={result.bsaEvidenceRecord.clientSha256}>
                {result.bsaEvidenceRecord.clientSha256.substring(0, 28)}...
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 uppercase text-[10px]">Routing Channel</span>
              <span className="text-emerald-400 font-semibold text-[11px]">
                {result.redressalChannel === 'CHANNEL_A_CYBERCRIME_1930' ? 'MHA I4C & SEBI Vigilance' : 'SEBI SCORES 2.0 / RAASB'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-mono font-bold text-xs text-center flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition tracking-wider uppercase disabled:opacity-40"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>{isGeneratingPdf ? 'Compiling PDF...' : 'Download Evidence Dossier (PDF)'}</span>
          </button>

          <a
            href={result.redressalChannel === 'CHANNEL_A_CYBERCRIME_1930' ? 'https://cybercrime.gov.in' : 'https://scores.sebi.gov.in'}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 font-mono text-xs flex items-center gap-1.5 border border-white/[0.08] transition"
          >
            <span>{result.redressalChannel === 'CHANNEL_A_CYBERCRIME_1930' ? 'I4C Portal' : 'SCORES 2.0'}</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

    </div>
  );
};
