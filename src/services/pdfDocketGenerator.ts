import jsPDF from 'jspdf';
import { ThreatAnalysisResult } from './verificationEngine.ts';

export function generateBsa2023PdfDocket(result: ThreatAnalysisResult) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const docketId = result.bsaEvidenceRecord.docketId;
  const timestamp = result.bsaEvidenceRecord.isoTimestamp;

  // Header Bar
  doc.setFillColor(7, 94, 84); // Bharat Green
  doc.rect(0, 0, pageWidth, 22, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('SANGYANKAVACH — INVESTOR EVIDENCE DOSSIER', 14, 11);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('ELECTRONIC RECORD AUDIT UNDER BHARATIYA SAKSHYA ADHINIYAM, 2023 (SEC 63)', 14, 17);

  // Docket Meta
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`DOCKET REFERENCE: #${docketId}`, 14, 30);
  doc.setFont('helvetica', 'normal');
  doc.text(`TIMESTAMP (UTC): ${timestamp}`, 14, 35);
  doc.text(`REDRESSAL CHANNEL: ${result.redressalChannel === 'CHANNEL_A_CYBERCRIME_1930' ? 'MHA 1930 / Cybercrime Portal (I4C)' : 'SEBI SCORES 2.0 / RAASB'}`, 14, 40);

  // Verdict Box
  const isDanger = result.verdict === 'CRITICAL_SCAM_HAZARD';
  const isSuspicious = result.verdict === 'SUSPICIOUS_ATTENTION';
  const fillColor = isDanger ? [254, 226, 226] : isSuspicious ? [254, 243, 199] : [220, 252, 231];
  const textColor = isDanger ? [185, 28, 28] : isSuspicious ? [180, 83, 9] : [21, 128, 61];

  doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
  doc.rect(14, 45, pageWidth - 28, 18, 'F');
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`AUDIT VERDICT: ${result.headline.toUpperCase()}`, 18, 52);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Diagnostic Threat Index: ${result.threatScore} / 100 | Action: Intercept & Report Immediately`, 18, 58);

  // Section 1: Extracted Target Parameters
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('1. FORENSIC EXTRACTION PARAMETERS', 14, 70);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  let y = 77;
  
  const addParam = (label: string, value: string) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, 16, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 60, y);
    y += 6;
  };

  addParam('Claimed Registration No', result.extractedRegNo || 'Not Specified / Withheld');
  if (result.verifiedEntity) {
    addParam('True Intermediary Name', result.verifiedEntity.name);
    addParam('Official Registered Email', result.verifiedEntity.registeredEmail);
    addParam('Official Entity Address', result.verifiedEntity.address);
  }
  addParam('Recipient Payment Handle (UPI)', result.extractedUpi || 'None Detected in sample');
  if (result.extractedIsin) {
    addParam('Target ISIN Scrip', `${result.extractedIsin} (${result.isinValidation?.valid ? 'Luhn Verified' : 'COUNTERFEIT'})`);
  }

  y += 4;
  // Section 2: Statutory Violations Detected
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('2. DETECTED STATUTORY & REGULATORY VIOLATIONS', 14, y);
  y += 7;

  doc.setFontSize(9);
  result.regulatoryViolations.forEach((v, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${idx + 1}. ${v.statute} [${v.severity}]`, 16, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(v.description, pageWidth - 36);
    doc.text(lines, 18, y);
    y += lines.length * 4.5 + 3;
  });

  y += 4;
  // Section 3: Statutory Certificate (Section 63 BSA 2023)
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, pageWidth - 28, 38, 'F');
  
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('3. STATUTORY ELECTRONIC EVIDENCE CERTIFICATE', 18, y + 6);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Pursuant to Section 63 of the Bharatiya Sakshya Adhiniyam, 2023 (formerly Sec 65B of Evidence Act):', 18, y + 11);
  
  const certText = `I hereby certify that this forensic electronic report was compiled automatically by the SangyanKavach verification node. The source digital submission was received and hashed client-side with SHA-256: ${result.bsaEvidenceRecord.clientSha256.substring(0, 36)}... The data was processed during regular system operations without unauthorized alteration.`;
  const certLines = doc.splitTextToSize(certText, pageWidth - 36);
  doc.text(certLines, 18, y + 16);

  y += 46;

  // Footer Disclaimer
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Developer Prototype • Designed by Independent Developer for Public Investor Protection & Financial Resilience', 14, y);
  doc.text('This document is an automated electronic audit report and does not constitute a formal judicial order.', 14, y + 4);

  // Save the PDF
  doc.save(`SangyanKavach_Evidence_Docket_${docketId}.pdf`);
}
