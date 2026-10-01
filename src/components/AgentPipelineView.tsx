import React, { useState } from 'react';
import { 
  Workflow, 
  ShieldAlert, 
  Search, 
  GitBranch, 
  Terminal, 
  Scale, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Database, 
  Layers, 
  ArrowRight,
  Cpu,
  ChevronRight,
  FileCode
} from 'lucide-react';
import { AgentNode, InvestigationCase } from '../types/soc';

interface AgentPipelineViewProps {
  agents: AgentNode[];
  caseData: InvestigationCase;
  onOpenWorkspace: () => void;
}

export const AgentPipelineView: React.FC<AgentPipelineViewProps> = ({
  agents,
  caseData,
  onOpenWorkspace,
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('agent-correlator');
  const [activeStateTab, setActiveStateTab] = useState<'evidence' | 'timeline' | 'hypotheses' | 'confidence'>('hypotheses');

  const selectedAgent = agents.find(a => a.id === selectedAgentId) || agents[2];

  const pipelineStages = [
    { key: 'ALERT', label: 'ALERT', icon: ShieldAlert, subtitle: 'Normalized SIEM Trigger' },
    { key: 'TRIAGE', agentId: 'agent-triage', label: 'TRIAGE', icon: ShieldAlert, subtitle: 'Severity & Blast Radius' },
    { key: 'LOG_ANALYSIS', agentId: 'agent-log-analyst', label: 'LOG ANALYSIS', icon: Search, subtitle: 'Identity & VPN Streams' },
    { key: 'CORRELATION', agentId: 'agent-correlator', label: 'CORRELATION', icon: GitBranch, subtitle: 'Cross-Source Linking' },
    { key: 'INVESTIGATION', agentId: 'agent-investigator', label: 'INVESTIGATION', icon: Terminal, subtitle: 'Timeline & Hypotheses' },
    { key: 'RISK', agentId: 'agent-risk', label: 'RISK', icon: Scale, subtitle: 'Bayesian Scoring' },
    { key: 'RESPONSE', agentId: 'agent-response', label: 'RESPONSE', icon: ShieldCheck, subtitle: 'HITL Containment' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>ORCHESTRATION PIPELINE</span>
            <span className="text-slate-600">/</span>
            <span>MULTI-AGENT REASONING GRAPH</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Multi-Agent Investigation Architecture</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Six specialized autonomous agents collaborating asynchronously over a central blackboard architecture (Shared Case State).
          </p>
        </div>

        <button
          onClick={onOpenWorkspace}
          className="px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 flex items-center gap-2 transition-colors self-start md:self-auto"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Switch to Case Workspace</span>
        </button>
      </div>

      {/* Horizontal Interactive Pipeline Strip */}
      <div className="p-6 rounded-2xl bg-[#070d1a] border border-cyan-900/40 shadow-xl overflow-x-auto">
        <div className="flex items-center justify-between min-w-[840px] relative">
          
          {/* Background connector line */}
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-emerald-500/40 -translate-y-1/2 pointer-events-none" />

          {pipelineStages.map((stage, idx) => {
            const agent = stage.agentId ? agents.find(a => a.id === stage.agentId) : null;
            const isSelected = stage.agentId === selectedAgentId;
            const IconComponent = stage.icon;

            return (
              <div key={stage.key} className="relative z-10 flex flex-col items-center">
                <button
                  onClick={() => stage.agentId && setSelectedAgentId(stage.agentId)}
                  className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-[#0f1d38] border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105'
                      : stage.agentId
                      ? 'bg-[#0a1224] border border-slate-700 hover:border-slate-500 hover:scale-102'
                      : 'bg-[#060a14] border border-slate-800'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-300'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <span className="text-xs font-bold text-white font-mono">{stage.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">{stage.subtitle}</span>

                  {agent && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        agent.status === 'completed' ? 'bg-emerald-400' :
                        agent.status === 'conflict' ? 'bg-amber-400 animate-ping' :
                        agent.status === 'warning' ? 'bg-rose-400' : 'bg-cyan-400'
                      }`} />
                      <span className="text-[10px] font-mono text-slate-400 capitalize">
                        {agent.status}
                      </span>
                    </div>
                  )}
                </button>

                {idx < pipelineStages.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 hidden md:block pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: Selected Agent Inspector & Shared Case State */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Selected Agent Inspector (col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl bg-[#070d1a] border border-cyan-900/40 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                  <Workflow className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedAgent.name}</h3>
                  <p className="text-xs text-slate-400">{selectedAgent.role}</p>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                selectedAgent.status === 'completed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' :
                selectedAgent.status === 'conflict' ? 'bg-amber-950 text-amber-300 border border-amber-500/30' :
                'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
              }`}>
                {selectedAgent.status}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-lg bg-[#091122] border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Records Analyzed</span>
                <span className="text-white font-bold text-sm mt-0.5 block tabular-nums">
                  {selectedAgent.evidenceProcessed}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[#091122] border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Confidence</span>
                <span className="text-cyan-300 font-bold text-sm mt-0.5 block tabular-nums">
                  {selectedAgent.confidence}%
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[#091122] border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Execution Time</span>
                <span className="text-purple-300 font-bold text-sm mt-0.5 block tabular-nums">
                  {selectedAgent.runtimeMs}ms
                </span>
              </div>
            </div>

            {/* Current Objective */}
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                System Prompt Objective
              </div>
              <p className="text-xs text-slate-300 bg-[#091122] p-3 rounded-lg border border-slate-800 leading-relaxed font-mono">
                {selectedAgent.objective}
              </p>
            </div>

            {/* Output Findings */}
            <div>
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Agent Deduction & Output</span>
                <span className="text-slate-500">Blackboard Write</span>
              </div>
              <p className="text-xs text-white bg-[#060a14] p-3 rounded-lg border border-cyan-500/20 leading-relaxed">
                {selectedAgent.output}
              </p>
            </div>

          </div>
        </div>

        {/* Right Column: Central Shared Case State (col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl bg-[#070d1a] border border-purple-900/40 space-y-4">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Shared Case State (Blackboard)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">Case ID: {caseData.id}</p>
                </div>
              </div>

              {/* State Tabs */}
              <div className="flex items-center gap-1 p-1 bg-[#091122] border border-slate-800 rounded-lg">
                {(['evidence', 'timeline', 'hypotheses', 'confidence'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveStateTab(tab)}
                    className={`px-2.5 py-1 text-xs font-mono rounded capitalize transition-colors ${
                      activeStateTab === tab
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab 1: Evidence State */}
            {activeStateTab === 'evidence' && (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                <div className="text-xs text-slate-400 font-mono mb-2">
                  All agents read from and append verified telemetry hashes to this central store.
                </div>
                {caseData.evidence.map((ev) => (
                  <div key={ev.id} className="p-3 rounded-lg bg-[#091122] border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-cyan-400 font-bold">{ev.id} · {ev.source}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                        ev.reliability === 'HIGH' ? 'text-emerald-400 bg-emerald-950' : 'text-amber-400 bg-amber-950'
                      }`}>
                        {ev.reliability}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px]">{ev.event}</p>
                    <div className="text-[10px] font-mono text-slate-500 truncate">{ev.verifiedHash}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Timeline State */}
            {activeStateTab === 'timeline' && (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                <div className="text-xs text-slate-400 font-mono mb-2">
                  Chronologically synchronized events across disparate timezones and clock drift adjustments.
                </div>
                {caseData.timeline.map((event) => (
                  <div key={event.id} className="p-2.5 rounded-lg bg-[#091122] border border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-mono text-cyan-400 mr-2">{event.time}</span>
                      <span className="font-semibold text-white">{event.title}</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">{event.description}</p>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase shrink-0 ml-2 ${
                      event.severity === 'critical' ? 'text-rose-400 bg-rose-950' : 'text-slate-300 bg-slate-800'
                    }`}>
                      {event.severity}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Hypotheses State */}
            {activeStateTab === 'hypotheses' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-400 font-mono">
                  Autonomous agents construct hypotheses and counter-hypotheses. Hypotheses with unexplained contradictions receive probability discounts.
                </div>
                {caseData.hypotheses.map((hyp) => (
                  <div key={hyp.id} className="p-3.5 rounded-xl bg-[#091122] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white font-mono flex items-center gap-2">
                        <span>{hyp.id}: {hyp.title}</span>
                        {hyp.type === 'primary' && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                            Leading Hypothesis
                          </span>
                        )}
                      </span>
                      <span className="font-mono font-bold text-cyan-300 text-sm">{hyp.likelihood}%</span>
                    </div>

                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" style={{ width: `${hyp.likelihood}%` }} />
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{hyp.description}</p>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center gap-4 text-[10px] font-mono text-slate-400">
                      <span>Supported by: <span className="text-emerald-400">{hyp.supportingEvidenceIds.join(', ') || 'None'}</span></span>
                      {hyp.refutingEvidenceIds.length > 0 && (
                        <span>Contradicted by: <span className="text-rose-400">{hyp.refutingEvidenceIds.join(', ')}</span></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Confidence Engine State */}
            {activeStateTab === 'confidence' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-400 font-mono">
                  Bayesian evidence updater penalizes missing sources and weights hardware cryptographic proofs above IP geolocation.
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-[#091122] border border-slate-800">
                    <span className="text-slate-500">Hardware Telemetry Weight</span>
                    <p className="text-emerald-400 font-bold text-sm mt-1">95% (FIDO2 + Jamf)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#091122] border border-slate-800">
                    <span className="text-slate-500">IP Geolocation Weight</span>
                    <p className="text-amber-400 font-bold text-sm mt-1">45% (Subject to Proxies)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#091122] border border-slate-800">
                    <span className="text-slate-500">Data Completeness Penalty</span>
                    <p className="text-rose-400 font-bold text-sm mt-1">−14% (Zscaler Buffer Drop)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#091122] border border-slate-800">
                    <span className="text-slate-500">Net Calculated Confidence</span>
                    <p className="text-cyan-300 font-bold text-sm mt-1">78% (MEDIUM Range)</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/30 text-xs text-slate-300 font-mono leading-relaxed">
                  <span className="text-cyan-400 font-bold">Analyst Guidance: </span>
                  When Attack Confidence is MEDIUM and Evidence Quality is HIGH, avoid high-blast-radius automations like identity lockouts. Perform selective session token revocation.
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
