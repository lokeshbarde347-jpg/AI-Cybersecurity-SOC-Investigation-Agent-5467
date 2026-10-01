import React, { useState } from 'react';
import { 
  Terminal, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Database, 
  ChevronRight, 
  Search, 
  Layers, 
  Scale, 
  HelpCircle,
  FileText,
  UserCheck,
  Ban,
  Shield,
  Eye,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { InvestigationCase, TimelineEvent, EvidenceItem, ResponseAction } from '../types/soc';

interface InvestigationWorkspaceProps {
  caseData: InvestigationCase;
  onOpenEvidence: (evidence: EvidenceItem) => void;
  onRequestApproval: (action: ResponseAction) => void;
  onExecuteAction: (actionId: string) => void;
  onNavigateToContradictions: () => void;
}

export const InvestigationWorkspace: React.FC<InvestigationWorkspaceProps> = ({
  caseData,
  onOpenEvidence,
  onRequestApproval,
  onExecuteAction,
  onNavigateToContradictions,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(caseData.timeline[1]?.id || caseData.timeline[0]?.id);

  const selectedEvent = caseData.timeline.find(e => e.id === selectedEventId) || caseData.timeline[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner / Case Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#091122] border border-cyan-900/40">
        <div className="flex flex-wrap items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                {caseData.id}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/30 font-semibold uppercase">
                {caseData.severity} SEVERITY
              </span>
              {caseData.assessment.contradictionDetected && (
                <button
                  onClick={onNavigateToContradictions}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40 hover:bg-amber-900/40 flex items-center gap-1 transition-colors"
                >
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  CONTRADICTION DETECTED · INSPECT PROOF
                </button>
              )}
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              {caseData.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-t md:border-t-0 md:border-l border-slate-800 pt-2 md:pt-0 md:pl-4">
          <div>
            <span className="text-slate-500 block">Status</span>
            <span className="text-cyan-300 font-semibold">{caseData.status}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Investigator</span>
            <span className="text-white">Multi-Agent Core</span>
          </div>
          <div>
            <span className="text-slate-500 block">Last Sync</span>
            <span className="text-slate-300">{caseData.updatedAt}</span>
          </div>
        </div>
      </div>

      {/* Tri-Pane Investigation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ======================================================== */}
        {/* LEFT PANEL: Case Information & Entity Context (col-span-3) */}
        {/* ======================================================== */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-4 rounded-xl bg-[#070d1a] border border-slate-800 space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              Target Entity Context
            </h3>

            {/* Target Identity */}
            <div className="space-y-1.5 pb-3 border-b border-slate-800/80">
              <div className="text-[11px] font-mono text-slate-400">User Identity</div>
              <div className="text-sm font-bold text-white">{caseData.user}</div>
              <div className="text-xs text-slate-400">{caseData.userRole}</div>
              <div className="text-xs font-mono text-cyan-400/90">{caseData.department}</div>
            </div>

            {/* Target Device */}
            <div className="space-y-1.5 pb-3 border-b border-slate-800/80">
              <div className="text-[11px] font-mono text-slate-400">Device Hardware & MDM</div>
              <div className="text-xs font-mono font-semibold text-white">{caseData.device}</div>
              <div className="text-xs text-slate-400">{caseData.deviceType}</div>
              <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Jamf Pro MDM Compliant
              </div>
            </div>

            {/* Source & Attack Technique */}
            <div className="space-y-2">
              <div>
                <div className="text-[11px] font-mono text-slate-400">Primary Alert Source</div>
                <div className="text-xs text-slate-200 font-semibold">{caseData.source}</div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-slate-400">MITRE ATT&CK Mapping</div>
                <div className="text-xs font-mono text-cyan-300 bg-cyan-950/40 p-2 rounded border border-cyan-800/40 mt-1">
                  T1078.004: Valid Accounts (Cloud)
                  <br />
                  <span className="text-[10px] text-slate-400">Tactic: Initial Access / Credential</span>
                </div>
              </div>
            </div>

            {/* Evidence Quick-Jump List */}
            <div className="pt-2 border-t border-slate-800">
              <div className="text-[11px] font-mono text-slate-400 mb-2">Corroborated Evidence ({caseData.evidence.length})</div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {caseData.evidence.map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => onOpenEvidence(ev)}
                    className="w-full text-left p-2 rounded-lg bg-[#091122] hover:bg-[#0d1830] border border-slate-800 text-xs transition-colors flex items-center justify-between group"
                  >
                    <div className="truncate pr-2">
                      <span className="font-mono text-cyan-400 mr-1.5">{ev.id}</span>
                      <span className="text-slate-300 group-hover:text-white truncate">{ev.source.split(' ')[0]}</span>
                    </div>
                    {ev.hasConflict && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" title="Conflict" />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* CENTER PANEL: Interactive Investigation Timeline (col-span-5) */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-[#070d1a] border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Investigation Event Timeline
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                {caseData.timeline.length} Normalized Events
              </span>
            </div>

            {/* Vertical Interactive Timeline */}
            <div className="mt-4 relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {caseData.timeline.map((event, idx) => {
                const isSelected = event.id === selectedEventId;
                const isConflict = event.contradiction;
                const isCritical = event.severity === 'critical';
                const isAnomaly = event.severity === 'anomaly' || event.severity === 'suspicious';

                return (
                  <div key={event.id} className="relative group">
                    {/* Timeline Node Bullet */}
                    <button
                      onClick={() => setSelectedEventId(event.id)}
                      className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                        isSelected
                          ? 'bg-cyan-500 border-white shadow-[0_0_10px_rgba(6,182,212,0.8)] scale-110'
                          : isConflict
                          ? 'bg-amber-500 border-amber-300'
                          : isCritical
                          ? 'bg-rose-500 border-rose-300'
                          : isAnomaly
                          ? 'bg-amber-600 border-amber-400'
                          : 'bg-slate-900 border-slate-600 group-hover:border-cyan-400'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </button>

                    {/* Timeline Card */}
                    <div
                      onClick={() => setSelectedEventId(event.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#0f1d38] border-cyan-500/60 shadow-lg shadow-cyan-950/40'
                          : 'bg-[#091122] border-slate-800/90 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-cyan-400 font-semibold">{event.time}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded uppercase ${
                          event.severity === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                          event.severity === 'suspicious' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                          event.severity === 'anomaly' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                          'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}>
                          {event.severity}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white mt-1">{event.title}</h4>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{event.description}</p>

                      <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>Source: <span className="text-slate-300">{event.source}</span></span>
                        {event.evidenceId && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const ev = caseData.evidence.find(x => x.id === event.evidenceId);
                              if (ev) onOpenEvidence(ev);
                            }}
                            className="text-cyan-400 hover:text-cyan-300 underline font-semibold"
                          >
                            Inspect {event.evidenceId}
                          </button>
                        )}
                      </div>

                      {event.contradiction && (
                        <div className="mt-2 p-1.5 rounded bg-amber-950/40 border border-amber-500/30 text-[10px] font-mono text-amber-300 flex items-center gap-1.5">
                          <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                          <span>Contradicts physical geo-velocity calculation</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Event Telemetry Inspector Drawer */}
            {selectedEvent && (
              <div className="mt-6 p-3 rounded-lg bg-[#060a14] border border-cyan-900/40 text-xs font-mono space-y-1.5">
                <div className="text-[11px] uppercase tracking-wider text-cyan-400 font-bold flex items-center justify-between">
                  <span>Inspecting Event Telemetry</span>
                  <span className="text-slate-500">{selectedEvent.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 text-slate-300">
                  <div>
                    <span className="text-slate-500">Location:</span> {selectedEvent.location || 'N/A'}
                  </div>
                  <div>
                    <span className="text-slate-500">IP:</span> {selectedEvent.ip || 'Internal'}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT PANEL: AI Investigation Assessment & Response (col-span-4) */}
        {/* ======================================================== */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* AI Assessment Card */}
          <div className="p-4 rounded-xl bg-[#070d1a] border border-cyan-900/40 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <Scale className="w-4 h-4 text-cyan-400" />
                AI Investigation Assessment
              </h3>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                Confidence: {caseData.assessment.overallConfidence}
              </span>
            </div>

            {/* Verdict */}
            <div>
              <div className="text-[11px] font-mono text-slate-400">Preliminary Verdict</div>
              <div className="text-sm font-bold text-white mt-0.5 leading-snug">
                {caseData.assessment.verdict}
              </div>
            </div>

            {/* Tri-Metric Confidence Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-[#091122] border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Evidence Quality</span>
                <span className="text-emerald-400 font-bold text-xs mt-1 block">
                  {caseData.assessment.evidenceQuality}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#091122] border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Attack Confidence</span>
                <span className="text-amber-400 font-bold text-xs mt-1 block">
                  {caseData.assessment.attackConfidence}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#091122] border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Data Completeness</span>
                <span className="text-amber-300 font-bold text-xs mt-1 block">
                  {caseData.assessment.dataCompleteness}
                </span>
              </div>
            </div>

            {/* Competing Hypotheses */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Competing Hypotheses
              </div>
              {caseData.hypotheses.map((hyp) => (
                <div 
                  key={hyp.id} 
                  className={`p-2.5 rounded-lg border text-xs space-y-1.5 ${
                    hyp.type === 'primary' 
                      ? 'bg-cyan-950/20 border-cyan-500/30' 
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white truncate pr-2">{hyp.title}</span>
                    <span className="font-mono text-cyan-300 font-bold">{hyp.likelihood}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${hyp.type === 'primary' ? 'bg-cyan-400' : 'bg-slate-500'}`} 
                      style={{ width: `${hyp.likelihood}%` }} 
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{hyp.description}</p>
                </div>
              ))}
            </div>

            {/* Missing Telemetry Disclaimer */}
            <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs">
              <div className="text-amber-300 font-semibold flex items-center gap-1.5 font-mono mb-1">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                Missing Telemetry Penalties:
              </div>
              <ul className="text-[11px] text-slate-300 space-y-1 list-disc pl-4">
                {caseData.assessment.missingSources.map((src, i) => (
                  <li key={i}>{src}</li>
                ))}
              </ul>
            </div>

            {/* Recommended Response Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <span>Recommended Response Actions</span>
                <span className="text-amber-400 font-semibold">Human Gate</span>
              </div>

              <div className="space-y-2">
                {caseData.actions.slice(0, 4).map((action) => (
                  <div 
                    key={action.id}
                    className="p-2.5 rounded-lg bg-[#091122] border border-slate-800 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{action.name}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded uppercase ${
                        action.riskLevel === 'High' ? 'text-rose-400 bg-rose-950' :
                        action.riskLevel === 'Moderate' ? 'text-amber-400 bg-amber-950' : 'text-emerald-400 bg-emerald-950'
                      }`}>
                        {action.riskLevel} Risk
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{action.description}</p>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-mono text-slate-500">
                        {action.requiresApproval ? (action.approved ? 'Approved by Analyst' : 'Approval Required') : 'Pre-Authorized'}
                      </span>
                      
                      {action.executed ? (
                        <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Executed
                        </span>
                      ) : action.approved ? (
                        <button
                          onClick={() => onExecuteAction(action.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
                        >
                          Execute Now
                        </button>
                      ) : (
                        <button
                          onClick={() => onRequestApproval(action)}
                          className="px-2.5 py-1 text-[11px] font-semibold rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-colors"
                        >
                          Review & Approve
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
