import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  ShieldCheck, 
  Clock, 
  Database, 
  Share2, 
  Copy,
  Check
} from 'lucide-react';
import { InvestigationCase } from '../types/soc';

interface ReportsViewProps {
  caseData: InvestigationCase;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ caseData }) => {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationDate, setGenerationDate] = useState<string>('2026-09-30 10:28:15 UTC');

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationDate(new Date().toUTCString());
    }, 600);
  };

  const handleCopyMarkdown = () => {
    const md = `
# INCIDENT INVESTIGATION REPORT: ${caseData.id}
**Classification:** TLP:AMBER | CONFIDENTIAL SOC RECORD
**Alert Type:** ${caseData.alertType}
**Entity:** ${caseData.user} (${caseData.userRole})
**Device:** ${caseData.device}
**Date Generated:** ${generationDate}

## 1. Executive Summary
${caseData.assessment.verdict}
${caseData.assessment.analystSummary}

## 2. Contradiction & Telemetry Arbitration
${caseData.assessment.contradictionSummary || 'No unresolved contradictions.'}

## 3. Bayesian Confidence Matrix
- Overall Confidence: ${caseData.assessment.overallConfidence}
- Evidence Quality: ${caseData.assessment.evidenceQuality}
- Attack Confidence: ${caseData.assessment.attackConfidence}
- Data Completeness: ${caseData.assessment.dataCompleteness}

## 4. Key Normalized Timeline
${caseData.timeline.map(t => `- [${t.time}] ${t.title}: ${t.description} (Source: ${t.source})`).join('\n')}

## 5. Corroborated Evidence
${caseData.evidence.map(e => `- [${e.id}] ${e.source} (${e.reliability} Reliability) -> Supports: ${e.supports}`).join('\n')}

## 6. Proportional Response Status
${caseData.actions.map(a => `- [${a.executed ? 'EXECUTED' : a.approved ? 'APPROVED' : 'PENDING'}] ${a.name}: ${a.description}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>FORENSIC REPORT GENERATOR</span>
            <span className="text-slate-600">/</span>
            <span>AUDIT & COMPLIANCE READY</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Investigation Report</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-md shadow-cyan-500/20"
          >
            {isGenerating ? 'Regenerating...' : 'Generate Fresh Report'}
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 rounded-lg text-xs font-mono bg-[#091122] hover:bg-[#0e1830] text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied MD' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-lg text-xs font-mono bg-[#091122] hover:bg-[#0e1830] text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable / Viewable Report Document */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#080d1a] border border-slate-800 text-slate-200 shadow-2xl space-y-8 font-sans">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              Black Mesa Cybersecurity Operations · Incident Response Division
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1.5 tracking-tight">
              Case Investigation Report: {caseData.id}
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Automated Forensic Synthesis · Multi-Agent Blackboard Model
            </p>
          </div>

          <div className="text-right font-mono text-xs text-slate-400 space-y-1">
            <div><span className="text-slate-500">Classification:</span> <span className="text-amber-400 font-bold">TLP:AMBER</span></div>
            <div><span className="text-slate-500">Report Date:</span> {generationDate}</div>
            <div><span className="text-slate-500">Case Status:</span> <span className="text-cyan-300">{caseData.status}</span></div>
          </div>
        </div>

        {/* Section 1: Incident Summary */}
        <div className="space-y-3">
          <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <span>01. Incident Summary & Root Cause Verdict</span>
          </h3>
          <div className="p-4 rounded-xl bg-[#050811] border border-slate-800/80 space-y-2">
            <div className="text-base font-bold text-white leading-snug">
              {caseData.assessment.verdict}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {caseData.assessment.analystSummary}
            </p>
          </div>
        </div>

        {/* Section 2: Contradictions & Arbitration */}
        <div className="space-y-3">
          <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <span>02. Contradiction Detection & Telemetry Arbitration</span>
          </h3>
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-slate-300 leading-relaxed space-y-2">
            <p>{caseData.assessment.contradictionSummary}</p>
            <div className="font-mono text-amber-300 font-semibold pt-1">
              Arbitration Ruling: Physical MDM hardware presence in Frankfurt trumps external egress IP telemetry from Tokyo.
            </div>
          </div>
        </div>

        {/* Section 3: Risk Assessment & Confidence Matrix */}
        <div className="space-y-3">
          <h3 className="text-sm font-mono font-bold text-purple-400 uppercase tracking-wider">
            03. Bayesian Confidence & Uncertainty Quantification
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#050811] border border-slate-800 text-center">
              <span className="text-slate-400 text-[10px] block">Overall Confidence</span>
              <span className="text-sm font-bold text-cyan-300 mt-1 block">{caseData.assessment.overallConfidence}</span>
            </div>
            <div className="p-3 rounded-lg bg-[#050811] border border-slate-800 text-center">
              <span className="text-slate-400 text-[10px] block">Evidence Quality</span>
              <span className="text-sm font-bold text-emerald-400 mt-1 block">{caseData.assessment.evidenceQuality}</span>
            </div>
            <div className="p-3 rounded-lg bg-[#050811] border border-slate-800 text-center">
              <span className="text-slate-400 text-[10px] block">Attack Confidence</span>
              <span className="text-sm font-bold text-amber-400 mt-1 block">{caseData.assessment.attackConfidence}</span>
            </div>
            <div className="p-3 rounded-lg bg-[#050811] border border-slate-800 text-center">
              <span className="text-slate-400 text-[10px] block">Data Completeness</span>
              <span className="text-sm font-bold text-amber-300 mt-1 block">{caseData.assessment.dataCompleteness}</span>
            </div>
          </div>
        </div>

        {/* Section 4: Event Timeline */}
        <div className="space-y-3">
          <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider">
            04. Correlated Incident Chronology
          </h3>
          <div className="space-y-2 text-xs font-mono">
            {caseData.timeline.map((event) => (
              <div key={event.id} className="p-2.5 rounded-lg bg-[#050811] border border-slate-800/80 flex items-start justify-between gap-3">
                <div>
                  <span className="text-cyan-400 font-bold">{event.time}</span>
                  <span className="text-white font-semibold ml-2">{event.title}</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">{event.description}</p>
                </div>
                <span className="text-[10px] text-slate-500 uppercase">{event.source}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Recommended Responses & Sign-off */}
        <div className="space-y-3">
          <h3 className="text-sm font-mono font-bold text-emerald-400 uppercase tracking-wider">
            05. Remediation Plan & Human Sign-off Audit
          </h3>
          <div className="space-y-2 text-xs">
            {caseData.actions.map((act) => (
              <div key={act.id} className="p-3 rounded-lg bg-[#050811] border border-slate-800/80 flex items-center justify-between font-mono">
                <div>
                  <span className="text-white font-semibold">{act.name}</span>
                  <p className="text-slate-400 text-[11px]">{act.description}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                  act.executed ? 'text-emerald-400 bg-emerald-950' :
                  act.approved ? 'text-cyan-300 bg-cyan-950' : 'text-amber-400 bg-amber-950'
                }`}>
                  {act.executed ? 'Executed' : act.approved ? 'Approved' : 'Pending Gate'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sign-off box */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            <span>Primary Autonomous Agent: </span>
            <span className="text-cyan-300">AegisSOC Multi-Agent Swarm v2.4</span>
          </div>
          <div>
            <span>Human Duty Officer Signature: </span>
            <span className="text-white font-semibold underline underline-offset-4">L. Barde (Tier-2 SOC Analyst)</span>
          </div>
        </div>

      </div>

    </div>
  );
};
