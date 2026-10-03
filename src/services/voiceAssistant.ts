// Voice Assistant using Browser Web Speech Synthesis API (English)

class VoiceAssistant {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private onStateChangeCallback: ((speaking: boolean) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public setListener(cb: (speaking: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  public speak(text: string) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    const voices = this.synth.getVoices();
    // Prioritize natural English voices
    const selectedVoice = voices.find(v => v.lang.startsWith('en-IN')) ||
                          voices.find(v => v.lang.startsWith('en-US')) ||
                          voices.find(v => v.lang.startsWith('en-GB')) ||
                          voices.find(v => v.lang.startsWith('en'));

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (this.onStateChangeCallback) this.onStateChangeCallback(true);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      this.isSpeaking = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
      this.isSpeaking = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    }
  }

  public toggle(text: string) {
    if (this.isSpeaking) {
      this.stop();
    } else {
      this.speak(text);
    }
  }
}

export const voiceAssistant = new VoiceAssistant();
