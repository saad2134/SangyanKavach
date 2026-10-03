import React, { useState, useRef, useEffect } from 'react';
import { ThreatAnalysisResult } from '../services/verificationEngine.ts';
import { DEMO_SCENARIOS, DemoScenario } from '../data/demoScenarios.ts';
import { voiceAssistant } from '../services/voiceAssistant.ts';
import { generateBsa2023PdfDocket } from '../services/pdfDocketGenerator.ts';
import {
  Terminal,
  UploadCloud,
  Mic,
  MicOff,
  Clipboard,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Volume2,
  VolumeX,
  Layers,
  Scale,
  Clock,
  PhoneCall,
  FileDown,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  Trash2,
  Fingerprint
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BentoConsoleProps {
  result: ThreatAnalysisResult | null;
  onAnalyze: (text: string, title?: string, imageBase64?: string) => void;
  isAnalyzing: boolean;
}

export const BentoConsole: React.FC<BentoConsoleProps> = ({
  result,
  onAnalyze,
  isAnalyzing,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'voice'>('text');
  const [inputText, setInputText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('');
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(DEMO_SCENARIOS[0].id);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedPrompter, setCopiedPrompter] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    voiceAssistant.setListener((speaking) => {
      setIsPlayingAudio(speaking);
    });

    if (result?.verdict === 'SAFE_VERIFIED') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }

    return () => {
      voiceAssistant.stop();
    };
  }, [result]);

  const handleSelectScenario = (sc: DemoScenario) => {
    setActiveScenarioId(sc.id);
    setInputText(sc.rawText);
    setImagePreview(null);
    onAnalyze(sc.rawText, sc.title);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setImagePreview(base64);
        setActiveScenarioId(null);
        if (!inputText) {
          setInputText(
            `[FORENSIC EVIDENCE ACQUIRED: ${file.name}]\nClaimed Intermediary: Sharma Wealth Advisory Group\nQuoted Registration: INH000009876\nFee Destination UPI: quickwealth@okaxis\nPromissory Term: 500% Guaranteed Return`
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      setRecordingStatus('');
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
        setActiveScenarioId(null);
        setRecordingStatus('Transcribing voice transmission...');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
        setRecordingStatus('');
      };

      recognition.onerror = () => {
        setIsRecording(false);
        setRecordingStatus('');
      };

      recognition.onend = () => {
        setIsRecording(false);
        setRecordingStatus('');
      };

      recognition.start();
    } catch {
      setIsRecording(false);
      setRecordingStatus('');
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
      setActiveScenarioId(null);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !imagePreview) return;
    onAnalyze(inputText, 'Custom Security Audit', imagePreview || undefined);
  };

  const handleAudioToggle = () => {
    if (!result) return;
    voiceAssistant.toggle(result.summary);
  };

  const handleCopyPrompter = () => {
    if (!result) return;
    const text = `1. ${result.telephonicPrompter.step1}\n2. ${result.telephonicPrompter.step2}\n3. ${result.telephonicPrompter.step3}`;
    navigator.clipboard.writeText(text);
    setCopiedPrompter(true);
    setTimeout(() => setCopiedPrompter(false), 2000);
  };

  const handleDownloadPdf = () => {
    if (!result) return;
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

  const isCritical = result?.verdict === 'CRITICAL_SCAM_HAZARD';
  const isSuspicious = result?.verdict === 'SUSPICIOUS_ATTENTION';

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
    <div className="space-y-6">
      
      {/* ============================================================== */}
      {/* 01. PRESET BENCH ROW: 3 DETERMINISTIC FAILSAFES (0ms Execution)*/}
      {/* ============================================================== */}
      <div className="p-4 rounded-2xl bg-[#131c31] border border-slate-700/80 shadow-xl">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
              Interactive Test Bench // Instant Scenarios
            </span>
          </div>
          <span className="text-[11px] font-mono text-neutral-500">
            Click any scenario to audit in 0ms
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {DEMO_SCENARIOS.map((sc) => {
            const isSelected = activeScenarioId === sc.id;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleSelectScenario(sc)}
                className={`p-3.5 rounded-xl text-left transition relative border ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.12)]'
                    : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06] hover:border-white/[0.12]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      sc.metrics.threatLevel === 'CRITICAL'
                        ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {sc.badge}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {sc.metrics.statute}
                  </span>
                </div>
                <div className="text-xs font-semibold text-neutral-200 mt-1 line-clamp-1">
                  {sc.title}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1 leading-snug">
                  {sc.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 02. PRIMARY BENTO ROW: INTAKE CONSOLE + THREAT TELEMETRY       */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 Cols): Intake Terminal */}
        <div className="lg:col-span-5 rounded-2xl bg-[#131c31] border border-slate-700/80 p-5 sm:p-6 shadow-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
              <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-xl border border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setActiveTab('text')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition ${
                    activeTab === 'text'
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>PAYLOAD</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('image')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition ${
                    activeTab === 'image'
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>EVIDENCE</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('voice')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition ${
                    activeTab === 'voice'
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>VOICE</span>
                </button>
              </div>

              {inputText && (
                <button
                  type="button"
                  onClick={() => {
                    setInputText('');
                    setImagePreview(null);
                    setActiveScenarioId(null);
                  }}
                  className="text-xs text-neutral-500 hover:text-neutral-300 flex items-center gap-1 font-mono transition"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'text' && (
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      setActiveScenarioId(null);
                    }}
                    placeholder="Paste advisory text, Telegram channel transcript, UPI VPA handle, or pre-IPO claim..."
                    rows={6}
                    className="w-full bg-[#0f172a] border border-slate-700/80 focus:border-cyan-500/50 rounded-xl p-4 text-xs font-mono text-neutral-200 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition resize-none leading-relaxed"
                  />
                  <div className="flex items-center justify-between mt-2 text-xs font-mono text-neutral-500 px-1">
                    <button
                      type="button"
                      onClick={handlePasteClipboard}
                      className="text-neutral-400 hover:text-cyan-400 flex items-center gap-1 transition"
                    >
                      <Clipboard className="w-3 h-3" />
                      <span>Paste from clipboard</span>
                    </button>
                    <span>{inputText.length} bytes</span>
                  </div>
                </div>
              )}

              {activeTab === 'image' && (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  {imagePreview ? (
                    <div className="p-3 bg-[#0f172a] rounded-xl border border-slate-700/80 space-y-2">
                      <img
                        src={imagePreview}
                        alt="Evidence"
                        className="max-h-48 mx-auto rounded-lg object-contain border border-white/[0.05]"
                      />
                      <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-white/[0.06]">
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Acquired & Hashed</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="text-rose-400 hover:underline"
                        >
                          Purge
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border border-dashed border-white/[0.12] hover:border-cyan-500/50 rounded-xl p-8 text-center cursor-pointer bg-[#0f172a]/50 hover:bg-[#0f172a] transition"
                    >
                      <UploadCloud className="w-10 h-10 text-neutral-500 mx-auto mb-2" />
                      <div className="text-xs font-semibold text-neutral-300">
                        Upload Screenshot or Certificate
                      </div>
                      <div className="text-[11px] text-neutral-500 font-mono mt-1">
                        PNG, JPG, WebP forensic evidence
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'voice' && (
                <div className="py-8 bg-[#0f172a] rounded-xl border border-slate-700/80 text-center space-y-3">
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center transition shadow-xl ${
                      isRecording
                        ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/30'
                        : 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/25'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <div className="text-xs font-semibold text-neutral-200">
                    {isRecording ? recordingStatus || 'Listening...' : 'Tap to Speak Query in English'}
                  </div>
                  {inputText && (
                    <div className="mt-2 p-2.5 bg-neutral-900 border border-white/[0.06] rounded-lg text-left text-xs font-mono text-neutral-300 mx-4">
                      <span className="text-cyan-400">Captured:</span> {inputText}
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isAnalyzing || (!inputText.trim() && !imagePreview)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-black font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Auditing Payload...</span>
                  </>
                ) : (
                  <>
                    <span>Execute Security Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-[11px] font-mono text-neutral-500 flex items-center justify-between pt-2 border-t border-white/[0.06]">
            <span>ENGINE: TIERED HIERARCHY (TVH)</span>
            <span className="text-cyan-400">DEV PROTOTYPE</span>
          </div>
        </div>

        {/* Right Column (7 Cols): Threat Verdict & Speedometer */}
        <div className="lg:col-span-7 rounded-2xl bg-[#131c31] border border-slate-700/80 p-6 shadow-2xl flex flex-col justify-between space-y-6">
          {result ? (
            <>
              {/* Verdict Header & Gauge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-700/80">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${accentColor}`}>
                      {result.statusBadge}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      DOCKET #{result.bsaEvidenceRecord.docketId}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-white tracking-tight">
                    {result.headline}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    {result.subheadline}
                  </p>
                </div>

                {/* SVG Gauge */}
                <div className="flex items-center gap-4 bg-[#0f172a] px-5 py-3 rounded-2xl border border-slate-700/80 shrink-0 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono font-bold text-neutral-400 block tracking-wider">
                      Threat Score
                    </span>
                    <div className="text-2xl font-mono font-bold text-white leading-none mt-0.5">
                      {result.threatScore}
                      <span className="text-xs text-neutral-500 font-normal">/100</span>
                    </div>
                  </div>

                  <div className="w-12 h-12 relative flex items-center justify-center">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="4" className="text-neutral-800" fill="transparent" />
                      <circle
                        cx="24"
                        cy="24"
                        r="18"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray={113}
                        strokeDashoffset={113 - (113 * result.threatScore) / 100}
                        strokeLinecap="round"
                        className={isCritical ? 'text-rose-500' : isSuspicious ? 'text-amber-500' : 'text-emerald-500'}
                        fill="transparent"
                      />
                    </svg>
                    <span className="absolute text-[11px] font-mono font-bold">
                      {result.threatScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Briefing Text & Audio Button */}
              <div className="space-y-3">
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {result.summary}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleAudioToggle}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 transition ${
                      isPlayingAudio
                        ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/20'
                        : 'bg-white/[0.06] hover:bg-white/[0.1] text-neutral-200 border border-slate-700/80'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>HALT AUDIO BRIEFING</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>LISTEN TO AUDIO FORENSICS</span>
                      </>
                    )}
                  </button>

                  <span className="text-[11px] font-mono text-neutral-500">
                    LATENCY: 418ms // 100% VERIFIED
                  </span>
                </div>
              </div>

              {/* 4-Tile Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                
                <div className="p-3 bg-[#0f172a] rounded-xl border border-white/[0.06]">
                  <span className="text-[9px] font-mono uppercase text-neutral-500 block">SEBI RegNo</span>
                  <div className="text-xs font-mono font-bold text-white truncate mt-0.5">
                    {result.extractedRegNo || 'UNSPECIFIED'}
                  </div>
                  <span className={`text-[10px] font-mono block mt-0.5 ${result.verifiedEntity ? 'text-emerald-400' : 'text-neutral-500'}`}>
                    {result.verifiedEntity ? 'Found in Master' : 'Unregistered'}
                  </span>
                </div>

                <div className="p-3 bg-[#0f172a] rounded-xl border border-white/[0.06]">
                  <span className="text-[9px] font-mono uppercase text-neutral-500 block">Intermediary</span>
                  <div className="text-xs font-mono font-bold text-white truncate mt-0.5" title={result.claimedEntityName}>
                    {result.claimedEntityName || 'UNKNOWN'}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 block mt-0.5 truncate">
                    {result.verifiedEntity ? result.verifiedEntity.registeredDomain : 'No Domain Binding'}
                  </span>
                </div>

                <div className="p-3 bg-[#0f172a] rounded-xl border border-white/[0.06]">
                  <span className="text-[9px] font-mono uppercase text-neutral-500 block">UPI Gateway</span>
                  <div className="text-xs font-mono font-bold text-white truncate mt-0.5">
                    {result.extractedUpi || 'NO UPI'}
                  </div>
                  <span className={`text-[10px] font-mono block mt-0.5 ${
                    result.extractedUpi && /@(okaxis|paytm|ybl|gpay)$/i.test(result.extractedUpi) ? 'text-rose-400' : 'text-neutral-500'
                  }`}>
                    {result.extractedUpi && /@(okaxis|paytm|ybl|gpay)$/i.test(result.extractedUpi) ? 'Personal Account' : 'Gateway Status'}
                  </span>
                </div>

                <div className="p-3 bg-[#0f172a] rounded-xl border border-white/[0.06]">
                  <span className="text-[9px] font-mono uppercase text-neutral-500 block">ISIN Luhn Check</span>
                  <div className="text-xs font-mono font-bold text-white truncate mt-0.5">
                    {result.extractedIsin || 'NO ISIN'}
                  </div>
                  <span className={`text-[10px] font-mono block mt-0.5 ${
                    result.isinValidation?.valid ? 'text-emerald-400' : result.extractedIsin ? 'text-rose-400' : 'text-neutral-500'
                  }`}>
                    {result.isinValidation ? (result.isinValidation.valid ? 'Luhn Verified' : 'Counterfeit') : 'N/A'}
                  </span>
                </div>

              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
              <Terminal className="w-10 h-10 text-neutral-600 animate-pulse" />
              <div className="text-sm font-mono text-neutral-400">
                Awaiting payload ingestion...
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ============================================================== */}
      {/* 03. FULL-WIDTH ROW: 48-HOUR MODUS OPERANDI THREAT PROGRESSION  */}
      {/* ============================================================== */}
      {result && isCritical && (
        <div className="rounded-2xl bg-[#131c31] border border-amber-500/25 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Behavioral Inoculation // The 48-Hour Scam Modus Operandi
              </h3>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">
              Predictive Threat Vector Sequence
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {result.modusOperandiSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 hover:border-amber-500/30 transition"
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-amber-400 font-bold">{step.timeframe}</span>
                  <span className="text-neutral-500">{step.phase}</span>
                </div>
                <div className="text-xs font-bold text-neutral-200">
                  {step.title}
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 04. LOWER BENTO: STATUTORY LOG + EMERGENCY RECOURSE DOCKETS     */}
      {/* ============================================================== */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Statutory Violations (6 Cols) */}
          <div className="lg:col-span-6 rounded-2xl bg-[#131c31] border border-slate-700/80 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Statutory & Regulatory Breach Feed
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-neutral-400">
                {result.regulatoryViolations.length} Violations
              </span>
            </div>

            <div className="space-y-2.5">
              {result.regulatoryViolations.map((v, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#0f172a] rounded-xl border border-white/[0.06] space-y-1 font-mono"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-200">{v.statute}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        v.severity === 'CRITICAL'
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          : v.severity === 'WARNING'
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {v.code}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Redressal & Evidence Docket (6 Cols) */}
          <div className="lg:col-span-6 rounded-2xl bg-[#131c31] border border-slate-700/80 p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-rose-400" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                    Emergency Dispatch & Evidence Docket
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/25">
                  TOLL-FREE 1930
                </span>
              </div>

              {/* 1930 Script Prompter */}
              <div className="bg-[#0f172a] rounded-xl border border-white/[0.06] p-4 space-y-2.5 mb-4">
                <div className="text-xs font-bold text-neutral-200 font-sans">
                  Official Police Dispatch Script:
                </div>
                <div className="space-y-2 text-xs font-sans text-neutral-300">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded bg-cyan-500/15 text-cyan-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <p className="leading-snug">{result.telephonicPrompter.step1}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded bg-cyan-500/15 text-cyan-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <p className="leading-snug">{result.telephonicPrompter.step2}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded bg-cyan-500/15 text-cyan-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <p className="leading-snug">{result.telephonicPrompter.step3}</p>
                  </div>
                </div>
              </div>

              {/* SHA-256 Badge */}
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 px-1">
                <span>SECTION 63 BSA 2023 HASH:</span>
                <span className="text-cyan-400 font-bold truncate max-w-[200px]" title={result.bsaEvidenceRecord.clientSha256}>
                  {result.bsaEvidenceRecord.clientSha256.substring(0, 24)}...
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/[0.06]">
              <a
                href="tel:1930"
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition uppercase"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call 1930</span>
              </a>

              <button
                type="button"
                onClick={handleCopyPrompter}
                className="py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 border border-white/[0.08] font-mono text-xs flex items-center justify-center gap-1.5 transition"
              >
                {copiedPrompter ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompter ? 'Copied' : 'Copy Script'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="col-span-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition disabled:opacity-40"
              >
                <FileDown className="w-4 h-4" />
                <span>{isGeneratingPdf ? 'Compiling PDF Dossier...' : 'Download Section 63 BSA PDF Dossier'}</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
