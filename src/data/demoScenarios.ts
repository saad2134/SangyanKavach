export interface DemoScenario {
  id: string;
  badge: string;
  title: string;
  category: 'TELEGRAM_PUMP' | 'PRE_IPO_PHISHING' | 'GENUINE_COMPLIANT';
  rawText: string;
  description: string;
  metrics: {
    threatLevel: 'CRITICAL' | 'HIGH' | 'CLEAN';
    statute: string;
  };
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'scenario_telegram_pump',
    badge: 'SCENARIO 01 // CRITICAL',
    title: 'Telegram VIP Pump & Impersonation Scheme',
    category: 'TELEGRAM_PUMP',
    description: 'Forged SEBI Research Analyst RegNo, personal savings UPI handle, and 500% guaranteed profit lure.',
    metrics: {
      threatLevel: 'CRITICAL',
      statute: 'PFUTP Reg 4(2)(k) & Sec 12(1)'
    },
    rawText: `⚡ SEBI VIP MULTIBAGGER 500% GUARANTEED ⚡
Admin: Sharma Wealth Advisory Group
SEBI Registered Research Analyst: INH000009876
Hot Call: Buy XYZ Infra at Rs 4.20 - Operator Syndicate Confirmed, Target Rs 45 in 15 days!
100% Guaranteed profit, zero loss recovery system!
Send Rs 9,999 joining fee to UPI ID: quickwealth@okaxis before 9:00 AM to get exclusive institutional trading calls.`
  },
  {
    id: 'scenario_pre_ipo_phishing',
    badge: 'SCENARIO 02 // SEVERE',
    title: 'Pre-IPO Allocation & Demat e-DIS Phishing',
    category: 'PRE_IPO_PHISHING',
    description: 'Counterfeit ISIN failing Luhn Mod-10 mathematical check paired with an e-DIS T-PIN harvest link.',
    metrics: {
      threatLevel: 'CRITICAL',
      statute: 'ISO 6166 & Depository Act'
    },
    rawText: `EXCLUSIVE PRE-IPO ALLOTMENT NOTICE:
Congratulations! You have been allocated 500 unlisted pre-IPO shares of Tata Tech at Rs 120 per share (discounted institutional quota).
Allocated Depository ISIN: IN9999999999
Deposit mandatory Rs 60,000 for allocation confirmation.
To link your Demat and authorize share transfer, please enter your NSDL/CDSL T-PIN and Demat OTP immediately at:
http://demat-kyc-verify-nsdl.co/tpin-auth`
  },
  {
    id: 'scenario_genuine_compliant',
    badge: 'SCENARIO 03 // VERIFIED',
    title: 'SEBI Registered Research Analyst Report',
    category: 'GENUINE_COMPLIANT',
    description: 'Compliant institutional research carrying mandatory Regulation 19 & 20 statutory conflict disclosures.',
    metrics: {
      threatLevel: 'CLEAN',
      statute: 'RA Reg 19 & 20 Compliant'
    },
    rawText: `EQUITY RESEARCH REPORT - MARCH 2026
Entity: Motilal Oswal Financial Services Limited
SEBI Registration No: INH000001234
Official Website: https://www.motilaloswal.com | Email: research@motilaloswal.com
Target: Largecap Banking Sector Outlook. Expected upside subject to macroeconomic volatility.
STATUTORY DISCLOSURES UNDER SEBI (RESEARCH ANALYSTS) REGULATIONS, 2014 (REGULATION 19 & 20):
Analyst certifies that all views expressed accurately reflect personal opinion. Neither MOFSL nor its associates have received compensation from the subject company in past 12 months. Investment in securities market is subject to market risks. Read all scheme related documents carefully.`
  }
];
