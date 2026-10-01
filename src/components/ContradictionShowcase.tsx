import React, { useState } from 'react';
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  FileText, 
  ArrowRight, 
  Database, 
  Globe, 
  Radio, 
  Laptop, 
  Key, 
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import { InvestigationCase } from '../types/soc';

interface ContradictionShowcaseProps {
  caseData: InvestigationCase;
  onOpenWorkspace: () => void;
  onRequestApproval: (action: any) => void;
}

export const ContradictionShowcase: React.FC<ContradictionShowcaseProps> = ({
  caseData,
  onOpenWorkspace,
  onRequestApproval,
}) => {
  const [activeComparisonTab, setActiveComparisonTab] = useState<'agent' | 'naive'>('agent');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <span>DISCREPANCY ARBITRATION ENGINE</span>
            <span className="text-slate-600">/</span>
            <span>ANTI-HALLUCINATION SAFEGUARD</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            Contradiction Detection & Telemetry Arbitration
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Demonstrating how multi-agent corroboration prevents catastrophic false positives in "Impossible Travel" alerts.
          </p>
        </div>

        <button
          onClick={onOpenWorkspace}
          className="px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 flex items-center gap-2 transition-colors self-start md:self-auto"
        >
          <span>View in Investigation Timeline</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Hero Showcase Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e172a] via-[#091122] to-[#060a16] border border-amber-500/40 shadow-2xl relative overflow-hidden">
        
        {/* Top Alert Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                ALERT SPECIFICATION:
              </div>
              <h3 className="text-xl font-bold text-white">Impossible Travel</h3>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-300 bg-[#060a14] px-3 py-1.5 rounded-lg border border-slate-800">
            Calculated Velocity: <span className="text-rose-400 font-bold">284,000 km/h</span> (Supersonic Physical Impossibility)
          </div>
        </div>

        {/* 3 Evidence Pillars: Evidence A, Evidence B, Evidence C */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          
          {/* Evidence A */}
          <div className="p-4 rounded-xl bg-[#070e1c] border border-cyan-500/30 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                EVIDENCE A
              </span>
              <Key className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              Identity Log (Okta)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Successful FIDO2 hardware MFA login from <span className="text-cyan-300 font-semibold">Location A (Frankfurt am Main, Germany)</span> at 10:14:02 UTC.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
              IP: 194.25.0.42 (Deutsche Telekom)
            </div>
          </div>

          {/* Evidence B */}
          <div className="p-4 rounded-xl bg-[#070e1c] border border-amber-500/30 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30">
                EVIDENCE B
              </span>
              <Radio className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              VPN Log (GlobalProtect)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Session originated from <span className="text-amber-300 font-semibold">known corporate gateway in Tokyo, Japan</span> at 10:16:45 UTC (163s delta).
            </p>
            <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
              IP: 133.242.18.9 (Corporate Tokyo POP)
            </div>
          </div>

          {/* Evidence C */}
          <div className="p-4 rounded-xl bg-[#070e1c] border border-purple-500/30 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/30">
                EVIDENCE C
              </span>
              <Laptop className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              Device Data (Jamf MDM)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Managed endpoint ELENA-MBP-CORP-04 actively connected to <span className="text-purple-300 font-semibold">Frankfurt Office AP BSSID</span> at 10:21:30 UTC.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
              BSSID: 00:1a:2b:3c:4d:5e (FRA-HQ-FL3)
            </div>
          </div>

        </div>

        {/* Central Contradiction Arbitration Banner */}
        <div className="p-4 rounded-xl bg-amber-950/30 border-2 border-amber-500/60 shadow-lg space-y-2 text-center my-6">
          <div className="inline-flex items-center gap-2 text-amber-300 font-bold font-mono text-sm tracking-wide">
            <AlertTriangle className="w-5 h-5 text-amber-400 animate-bounce" />
            <span>⚠ CONTRADICTORY EVIDENCE DETECTED</span>
          </div>

          <div className="text-base sm:text-lg font-bold text-white font-mono">
            Conclusion: “Investigate anomaly; do not automatically label it an attack.”
          </div>

          <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The external IP suggests Tokyo, but physical hardware beacons and hardware MFA keys definitively establish the analyst never left Frankfurt. The Tokyo IP matches Black Mesa's corporate cloud egress split-tunnel proxy.
          </p>
        </div>

        {/* Three Required Confidence Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          <div className="p-4 rounded-xl bg-[#060a14] border border-emerald-500/30 text-center space-y-1">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Evidence Quality
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tracking-tight">
              HIGH
            </div>
            <p className="text-[11px] text-slate-500">Cryptographically signed FIDO2 & MDM heartbeats.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#060a14] border border-amber-500/30 text-center space-y-1">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Attack Confidence
            </div>
            <div className="text-2xl font-bold font-mono text-amber-400 tracking-tight">
              MEDIUM
            </div>
            <p className="text-[11px] text-slate-500">Strong indicator of split-tunnel network routing anomaly.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#060a14] border border-blue-500/30 text-center space-y-1">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Data Completeness
            </div>
            <div className="text-2xl font-bold font-mono text-blue-300 tracking-tight">
              PARTIAL
            </div>
            <p className="text-[11px] text-slate-500">Zscaler packet capture dropped; DNS telemetry pending.</p>
          </div>

        </div>

      </div>

      {/* Side-by-Side: Naïve AI vs AegisSOC Multi-Agent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Naïve AI Flaw */}
        <div className="p-5 rounded-xl bg-[#140b10] border border-rose-900/50 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase">
            <XCircle className="w-4 h-4" />
            Naïve LLM / Legacy SIEM Rule (Hallucinated Conclusion)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Sees 9,000 km travel in 2 minutes. Immediately declares <strong>"CRITICAL ACCOUNT COMPROMISE / THREAT ACTOR IN TOKYO"</strong> with 99% confidence.
          </p>
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/40 text-xs text-rose-200 space-y-1 font-mono">
            <div>❌ Automatically isolates laptop</div>
            <div>❌ Revokes all Active Directory credentials</div>
            <div>❌ Pages on-call incident commander at 2:00 AM</div>
            <div>❌ Results in severe false-positive business disruption</div>
          </div>
        </div>

        {/* AegisSOC Multi-Agent Approach */}
        <div className="p-5 rounded-xl bg-[#091524] border border-cyan-500/40 space-y-3">
          <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            AegisSOC Evidence-Based Reasoning (Zero Hallucination)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Cross-references physical WiFi BSSID and hardware inventory. Discovers Tokyo IP is an internal corporate egress gateway. Recognizes the contradiction and avoids premature conclusions.
          </p>
          <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 space-y-1 font-mono">
            <div>✓ Caps Attack Confidence at MEDIUM</div>
            <div>✓ Recommends zero-disruption Out-of-Band verification</div>
            <div>✓ Prepares selective Tokyo session revocation</div>
            <div>✓ Requires human analyst sign-off before containment</div>
          </div>
        </div>

      </div>

    </div>
  );
};
