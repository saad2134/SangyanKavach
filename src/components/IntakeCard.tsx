import React, { useState, useRef } from 'react';
import {
  FileText,
  UploadCloud,
  Mic,
  MicOff,
  Clipboard,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Terminal,
  Zap,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { DEMO_SCENARIOS, DemoScenario } from '../data/demoScenarios.ts';

interface IntakeCardProps {
  onAnalyze: (text: string, title?: string, imageBase64?: string) => void;
  isAnalyzing: boolean;
}

export const IntakeCard: React.FC<IntakeCardProps> = ({ onAnalyze, isAnalyzing }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'voice'>('text');
  const [inputText, setInputText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('');
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(DEMO_SCENARIOS[0].id);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
          setInputText(`[FORENSIC EVIDENCE ACQUIRED: ${file.name}]\nClaimed Intermediary: Sharma Wealth Advisory Group\nQuoted Registration: INH000009876\nFee Destination UPI: quickwealth@okaxis\nPromissory Term: 500% Guaranteed Return`);
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
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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
    onAnalyze(inputText, 'Manual Security Audit', imagePreview || undefined);
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/[0.08]">
      
      {/* Instant Demo Presets Header */}
      <div className="p-4 bg-obsidian-850/80 border-b border-white/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
              Deterministic Test Bench // Instant Scenarios
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            0ms Latency Verification
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {DEMO_SCENARIOS.map((sc) => {
            const isSelected = activeScenarioId === sc.id;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleSelectScenario(sc)}
                className={`p-3 rounded-xl text-left transition relative border ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.12)]'
                    : 'bg-obsidian-800/60 hover:bg-obsidian-750 border-white/[0.06] hover:border-white/[0.15]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    sc.metrics.threatLevel === 'CRITICAL'
                      ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {sc.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {sc.metrics.statute}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1 line-clamp-1">
                  {sc.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 leading-snug">
                  {sc.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Intake Console */}
      <div className="p-5 sm:p-6 space-y-4">
        
        {/* Navigation Selector */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-1.5 p-1 bg-obsidian-950/80 rounded-xl border border-white/[0.06]">
            
            <button
              type="button"
              onClick={() => setActiveTab('text')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono flex items-center gap-2 transition ${
                activeTab === 'text'
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>RAW PAYLOAD / TEXT</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('image')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono flex items-center gap-2 transition ${
                activeTab === 'image'
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>EVIDENCE / SCREENSHOT</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('voice')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono flex items-center gap-2 transition ${
                activeTab === 'voice'
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>VOICE INQUIRY</span>
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
              className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Tab 1: Raw Text */}
          {activeTab === 'text' && (
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setActiveScenarioId(null);
                }}
                placeholder="Paste suspect advisory message, Telegram post, UPI handle, unlisted ISIN, or URL here..."
                rows={5}
                className="w-full bg-[#050608] border border-white/[0.08] focus:border-cyan-500/50 rounded-xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition resize-none font-mono leading-relaxed"
              />
              <div className="flex items-center justify-between mt-2 px-1 text-xs">
                <button
                  type="button"
                  onClick={handlePasteClipboard}
                  className="text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition font-mono"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  <span>Paste from clipboard</span>
                </button>
                <span className="font-mono text-slate-500">
                  {inputText.length} bytes
                </span>
              </div>
            </div>
          )}

          {/* Tab 2: Document / Screenshot */}
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
                <div className="p-3 bg-[#050608] rounded-xl border border-white/[0.08] space-y-3">
                  <img
                    src={imagePreview}
                    alt="Acquired Evidence"
                    className="max-h-56 mx-auto rounded-lg object-contain border border-white/[0.05]"
                  />
                  <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-white/[0.06]">
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Evidence acquired and hashed into memory</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-rose-400 hover:underline"
                    >
                      Purge image
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-white/[0.12] hover:border-cyan-500/50 rounded-xl p-8 text-center cursor-pointer bg-[#050608]/50 hover:bg-[#050608] transition group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] group-hover:bg-cyan-500/10 flex items-center justify-center mx-auto mb-3 text-slate-400 group-hover:text-cyan-400 transition">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-slate-200">
                    Click or drag screenshot of suspect advisory
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">
                    Telegram, WhatsApp channel captures, forged SEBI certificates (PNG, JPG, WebP)
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Voice Transmission */}
          {activeTab === 'voice' && (
            <div className="py-8 bg-[#050608] rounded-xl border border-white/[0.08] text-center space-y-3">
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center transition shadow-xl ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/30'
                    : 'bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.15)]'
                }`}
              >
                {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <div>
                <div className="text-sm font-semibold text-slate-200">
                  {isRecording ? (recordingStatus || 'Transcribing spoken payload...') : 'Tap Microphone to Speak Query'}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-mono">
                  Example: "A Telegram channel claims guaranteed 500% profit with RegNo INH000009876, is it safe?"
                </div>
              </div>
              {inputText && (
                <div className="mt-3 p-3 bg-obsidian-850 border border-white/[0.06] rounded-lg text-left text-xs font-mono text-slate-300 mx-6">
                  <span className="text-cyan-400 font-semibold">Decoded:</span> {inputText}
                </div>
              )}
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
              <span>Zero-Retention Ephemeral Verification Node</span>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || (!inputText.trim() && !imagePreview)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <span>Execute Security Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
