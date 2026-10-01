import React from 'react';
import { 
  Flame, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  RotateCcw, 
  ShieldAlert, 
  ArrowRight,
  Terminal,
  Activity,
  Layers
} from 'lucide-react';
import { ResponseAction, InvestigationCase } from '../types/soc';

interface ResponseCenterProps {
  caseData: InvestigationCase;
  onRequestApproval: (action: ResponseAction) => void;
  onExecuteAction: (actionId: string) => void;
}

export const ResponseCenter: React.FC<ResponseCenterProps> = ({
  caseData,
  onRequestApproval,
  onExecuteAction,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
            <Flame className="w-4 h-4" />
            <span>INCIDENT REMEDIATION CONSOLE</span>
            <span className="text-slate-600">/</span>
            <span>HUMAN-IN-THE-LOOP APPROVAL GATE</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Autonomous Response Center</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            The AI synthesizes targeted actions with blast radius limits. Destructive containment strictly requires analyst sign-off.
          </p>
        </div>

        {/* HITL Badge */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs font-mono text-amber-300">
          <UserCheck className="w-4 h-4 text-amber-400" />
          <span>Human Approval Required (SOC Policy #POL-89)</span>
        </div>
      </div>

      {/* Target Case Context Bar */}
      <div className="p-4 rounded-xl bg-[#070d1a] border border-cyan-900/40 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
            {caseData.id}
          </span>
          <span className="text-white font-bold">{caseData.title}</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Target: <span className="text-white">{caseData.user}</span></span>
          <span>Attack Conf: <span className="text-amber-400 font-bold">{caseData.assessment.attackConfidence}</span></span>
          <span>Quality: <span className="text-emerald-400 font-bold">{caseData.assessment.evidenceQuality}</span></span>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseData.actions.map((action) => {
          const isHigh = action.riskLevel === 'High';
          const isModerate = action.riskLevel === 'Moderate';

          return (
            <div 
              key={action.id}
              className={`p-5 rounded-2xl bg-[#091122] border transition-all space-y-4 ${
                action.executed ? 'border-emerald-500/40 shadow-lg shadow-emerald-950/20' :
                action.approved ? 'border-cyan-500/40' :
                'border-slate-800'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold">{action.id}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs font-mono text-slate-400 uppercase">{action.type}</span>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  isHigh ? 'bg-rose-950 text-rose-300 border border-rose-500/40' :
                  isModerate ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                  'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {action.riskLevel} Risk
                </span>
              </div>

              {/* Title & Desc */}
              <div>
                <h3 className="text-base font-bold text-white">{action.name}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{action.description}</p>
              </div>

              {/* Blast Radius Box */}
              <div className="p-3 rounded-lg bg-[#060a14] border border-slate-800/80 text-xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Evaluated Blast Radius
                </span>
                <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                  {action.blastRadius}
                </p>
              </div>

              {/* Status and Action Trigger */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  {action.executed ? (
                    <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Executed & Verified
                    </span>
                  ) : action.approved ? (
                    <span className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-cyan-400" /> Authorized by Analyst
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Human Sign-off Needed
                    </span>
                  )}
                </div>

                <div>
                  {action.executed ? (
                    <span className="text-xs font-mono text-slate-500">Live</span>
                  ) : action.approved ? (
                    <button
                      onClick={() => onExecuteAction(action.id)}
                      className="px-4 py-2 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-md shadow-cyan-500/20"
                    >
                      Execute Remediation
                    </button>
                  ) : (
                    <button
                      onClick={() => onRequestApproval(action)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors"
                    >
                      Review & Authorize
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
