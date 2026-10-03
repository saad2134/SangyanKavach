export interface SebiIntermediary {
  regNo: string;
  name: string;
  category: 'Research Analyst' | 'Investment Adviser' | 'Stock Broker' | 'Depository Participant';
  validFrom: string;
  validTo: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED';
  registeredEmail: string;
  registeredDomain: string;
  registeredBankPrefix: string;
  address: string;
}

export interface NsdlDp {
  dpId: string;
  dpName: string;
  status: 'ACTIVE' | 'SUSPENDED';
  location: string;
}

export interface ValidIsin {
  isin: string;
  companyName: string;
  ticker: string;
  status: 'ACTIVE_DEMAT' | 'SUSPENDED';
}

// Representative SEBI Registered Intermediaries Directory
export const SEBI_MASTER_REGISTRY: SebiIntermediary[] = [
  {
    regNo: 'INH000009876',
    name: 'Alpha Analytics Research Private Limited',
    category: 'Research Analyst',
    validFrom: '2021-04-12',
    validTo: '2026-04-11',
    status: 'ACTIVE',
    registeredEmail: 'compliance@alphaanalytics.in',
    registeredDomain: 'alphaanalytics.in',
    registeredBankPrefix: 'alphaanalytics@icici',
    address: 'Kolkata, West Bengal, India'
  },
  {
    regNo: 'INH000001234',
    name: 'Motilal Oswal Financial Services Limited',
    category: 'Research Analyst',
    validFrom: '2015-01-01',
    validTo: '2030-12-31',
    status: 'ACTIVE',
    registeredEmail: 'research@motilaloswal.com',
    registeredDomain: 'motilaloswal.com',
    registeredBankPrefix: 'mofsl@hdfcbank',
    address: 'Motilal Oswal Tower, Prabhadevi, Mumbai'
  },
  {
    regNo: 'INH000002468',
    name: 'HDFC Securities Limited',
    category: 'Research Analyst',
    validFrom: '2016-03-15',
    validTo: '2031-03-14',
    status: 'ACTIVE',
    registeredEmail: 'customercare@hdfcsec.com',
    registeredDomain: 'hdfcsec.com',
    registeredBankPrefix: 'hdfcsec@hdfcbank',
    address: 'Kanjurmarg East, Mumbai'
  },
  {
    regNo: 'INA000008888',
    name: 'Prudence Wealth Advisory LLP',
    category: 'Investment Adviser',
    validFrom: '2020-08-20',
    validTo: '2025-08-19',
    status: 'ACTIVE',
    registeredEmail: 'info@prudencewealth.in',
    registeredDomain: 'prudencewealth.in',
    registeredBankPrefix: 'prudenceadv@axisbank',
    address: 'Bandra Kurla Complex, Mumbai'
  },
  {
    regNo: 'INZ000031633',
    name: 'Zerodha Broking Limited',
    category: 'Stock Broker',
    validFrom: '2018-06-01',
    validTo: '2028-05-31',
    status: 'ACTIVE',
    registeredEmail: 'compliance@zerodha.com',
    registeredDomain: 'zerodha.com',
    registeredBankPrefix: 'zerodhabroking@hdfcbank',
    address: 'JP Nagar, Bengaluru, Karnataka'
  }
];

// NSDL Depository Participants Directory (Sample representative)
export const NSDL_DP_REGISTRY: NsdlDp[] = [
  { dpId: 'IN300011', dpName: 'HDFC Bank Limited', status: 'ACTIVE', location: 'Mumbai' },
  { dpId: 'IN300126', dpName: 'ICICI Bank Limited', status: 'ACTIVE', location: 'Mumbai' },
  { dpId: 'IN300214', dpName: 'State Bank of India', status: 'ACTIVE', location: 'New Delhi' },
  { dpId: 'IN300476', dpName: 'Axis Bank Limited', status: 'ACTIVE', location: 'Ahmedabad' },
  { dpId: 'IN301549', dpName: 'Kotak Mahindra Bank Limited', status: 'ACTIVE', location: 'Mumbai' },
  { dpId: 'IN303028', dpName: 'Zerodha Broking Limited', status: 'ACTIVE', location: 'Bengaluru' },
  { dpId: 'IN304279', dpName: 'Groww (Nextbillion Technology)', status: 'ACTIVE', location: 'Bengaluru' }
];

// Valid Demat Admitted ISINs (Mathematically validated with Luhn Mod-10)
export const ADMITTED_ISINS: ValidIsin[] = [
  { isin: 'INE002A01018', companyName: 'Reliance Industries Limited', ticker: 'RELIANCE', status: 'ACTIVE_DEMAT' },
  { isin: 'INE009A01021', companyName: 'Infosys Limited', ticker: 'INFY', status: 'ACTIVE_DEMAT' },
  { isin: 'INE467B01029', companyName: 'Tata Consultancy Services Limited', ticker: 'TCS', status: 'ACTIVE_DEMAT' },
  { isin: 'INE040A01034', companyName: 'HDFC Bank Limited', ticker: 'HDFCBANK', status: 'ACTIVE_DEMAT' },
  { isin: 'INE155A01022', companyName: 'Tata Motors Limited', ticker: 'TATAMOTORS', status: 'ACTIVE_DEMAT' }
];

// RBI Alert List of Unauthorized Forex & Binary Options Platforms (Updated Official List)
export const RBI_ALERT_LIST = [
  'alpari', 'anyfx', 'ava trade', 'binomo', 'eToro', 'exness', 'expert option',
  'fbs', 'finowiz fintech', 'forex.com', 'forex4money', 'fox fx', 'ftmo',
  'fxtm', 'hotforex', 'ibell markets', 'ic markets', 'iq option', 'naga',
  'octafx', 'olymp trade', 'plus500', 'quotex', 'roboforex', 'strike fx',
  'superforex', 'tickmill', 'topforex', 'trade size', 'tradeview', 'urban forex',
  'vantage markets', 'xm', 'xtb', 'pocket option', 'binance gift card arbitrage'
];

// NPCI Recognized Bank PSP Handles for Designated Accounts
export const OFFICIAL_PSP_HANDLES = [
  'okaxis', 'okhdfcbank', 'okicici', 'oksbi', 'paytm', 'ybl', 'ibl',
  'axl', 'apl', 'razerpay', 'cashfree', 'airtel', 'federal', 'kotak'
];
