# 🛡️ SangyanKavach (संज्ञान कवच: आपका निवेशक कवच)
### *Bharat Investor Scam Interceptor & Verification Shield*
**Developer Prototype Release • Designed for Public Investor Protection**

---

## 📌 Overview
**SangyanKavach** is an open, client-centric developer prototype designed to protect first-time and retail investors across India from financial scams, fraudulent Telegram/WhatsApp tip syndicates, fake SEBI certificates, unauthorized demat transfers, and bogus pre-IPO allotments.

It acts at the decisive **pre-transaction interception point**, allowing users to upload screenshots, speak via voice notes in Hindi/vernacular, or paste suspicious text/links, returning an explainable diagnostic assessment and emergency action tools in **sub-second latency**.

---

## 🚀 Key Features

### 1. 🔍 Tiered Verification Hierarchy (TVH)
- **Tier 0 (Deterministic Syntax)**: Regular expression matching for SEBI Registration Numbers (`INH`, `INA`, `INZ`, `INP`), NSDL Depository Participants (`IN30xxxx`), and UPI handles.
- **ISO 6166 ISIN Validation**: Implements the mathematical **Luhn Mod-10 Check Digit algorithm** to catch counterfeit pre-IPO and unlisted share allocations before money changes hands.
- **Tier 1 (Master Registry Cache)**: Triangulates claims against indexed SEBI registered intermediaries, NSDL DPs, and the official **RBI Alert List (75+ unauthorized forex/binary platforms)**.
- **Tier 2 (Indic Phonetic Invariant - IPTI)**: Algorithmic phonetic normalizer resolving regional Indian transliteration variations (`Choudhary` vs `Chowdhry`, `Bikash` vs `Vikas`) in $< 0.05\text{ms}$.
- **Tier 3 (Multi-Vector Diagnostic Engine)**: Flags violations under SEBI PFUTP Reg 4(2)(k), BUDS Act 2019, SCRA Dabba Trading, and NSDL e-DIS/T-PIN pledge phishing attempts.

### 2. 🎙️ "Bada Bhai" Vernacular Audio Guidance
- Converts cold legal jargon into warm, empathetic spoken Hindi audio using browser-native Web Speech Synthesis.
- Explains the exact hazard in everyday language with zero technical complexity.

### 3. 🧠 48-Hour Modus Operandi Breakdown (Behavioral Inoculation)
- Punctures the illusion of control and greed by mapping the scammer's exact 48-hour sequence:
  1. *Honeytrap (Hour 0–2)*: Small deposit to build false trust.
  2. *The Big Trap (Hour 12–24)*: Coerced large deposit for "VIP allotment".
  3. *Phantom Surge (Hour 36)*: Fake screen showing inflated balance.
  4. *Extortion & Block (Hour 48)*: Demanding "TDS/tax" and blocking the victim.

### 4. 📞 1-Tap 1930 Cybercrime Helpline Prompter
- Direct 1-tap call to **1930 (National Cyber Crime Reporting Helpline)**.
- Features an on-screen **3-Sentence Hindi Telephonic Script Prompter** giving the victim the exact words to tell the police operator to initiate immediate bank account lien freezes.

### 5. ⚖️ Section 63 BSA 2023 Digital Evidence Docket
- Compiles a court-admissible PDF dossier certified under **Section 63 of the Bharatiya Sakshya Adhiniyam, 2023** (formerly Section 65B of the Indian Evidence Act).
- Includes client-side SHA-256 evidence fingerprint, UTC timestamp, and discrepancy audit table ready for upload to `cybercrime.gov.in` or `scores.sebi.gov.in`.

---

## 💻 Tech Stack
- **Frontend**: React 18 + Vite 6 + TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first configuration with `@tailwindcss/vite`)
- **Icons**: Lucide React
- **PDF Generation**: jsPDF (Section 63 BSA 2023 digital docket generation)
- **Audio & Speech**: Browser Web Speech Synthesis API & Web Speech Recognition
- **Cryptographic Fingerprinting**: Browser Web Crypto API (`window.crypto.subtle`)

---

## 🏃 Running the Prototype Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Visit http://localhost:5173
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🧪 3 Instant 0ms Demo Scenarios Included
The interface features three pre-canned 1-click test scenarios for instant demonstration:
1. 🔴 **Scenario 1: Gorakhpur Telegram VIP Pump** (Impersonated SEBI RA `INH000009876`, personal savings UPI `quickwealth@okaxis`, 500% profit claim).
2. 🔴 **Scenario 2: Pre-IPO Depository Phishing** (Bogus Tata Tech unlisted share with synthetic ISIN `IN9999999999` failing Luhn Mod-10 check + e-DIS T-PIN phishing link).
3. 🟢 **Scenario 3: Genuine SEBI Research Report** (Compliant report from Motilal Oswal with Regulation 19 & 20 statutory disclosures).

---

## 🛡️ Statutory Disclaimer & Guardrails
- **Developer Prototype**: This project is engineered by an independent developer as a public-good educational and defensive prototype.
- **Zero Stock Tips**: SangyanKavach provides strictly zero investment recommendations, price predictions, or buy/sell signals.
- **Privacy-by-Design**: Operates with ephemeral in-memory processing. Zero user media or personally identifiable information is stored on persistent servers.
