import React, { useState } from 'react';
import { EvidenceItem, ResponseAction } from '../types/soc';
import { X, ShieldAlert, CheckCircle2, FileCode, Hash, Database, Clock, UserCheck, AlertTriangle } from 'lucide-react';

interface EvidenceModalProps {
  evidence: EvidenceItem | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ evidence, onClose }) => {
  if (!evidence) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#0b1324] border border-cyan-500/30 rounded-xl shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080d1a]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/20 text-cyan-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                  {evidence.id}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                  evidence.reliability === 'HIGH' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' :
                  evidence.reliability === 'MEDIUM' ? 'bg-amber-950 text-amber-300 border border-amber-500/30' :
                  'bg-red-950 text-red-300 border border-red-500/30'
                }`}>
                  {evidence.reliability} RELIABILITY
                </span>
                {evidence.hasConflict && (
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 flex items-center gap-1 font-mono">
                    <AlertTriangle className="w-3 h-3" /> CONFLICT
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-white mt-1">{evidence.source}</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Event description */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Normalized Event</div>
            <p className="text-sm text-slate-100 bg-[#060a14] p-3 rounded-lg border border-slate-800">
              {evidence.event}
            </p>
          </div>

          {/* Time & Conflict Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#060a14] p-3 rounded-lg border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Ingestion Timestamp
              </div>
              <div className="text-sm font-mono text-cyan-200">{evidence.timestamp}</div>
            </div>
            <div className="bg-[#060a14] p-3 rounded-lg border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
                <Hash className="w-3.5 h-3.5 text-cyan-400" />
                Integrity Hash
              </div>
              <div className="text-xs font-mono text-slate-300 truncate" title={evidence.verifiedHash}>
                {evidence.verifiedHash}
              </div>
            </div>
          </div>

          {/* Supports / Contradicts Analysis */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Agent Correlation Hypothesis</div>
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200">
              <span className="font-semibold text-emerald-400">Supports: </span>
              {evidence.supports}
            </div>
            {evidence.contradicts && (
              <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200">
                <span className="font-semibold text-amber-400">Contradicts / Challenges: </span>
                {evidence.contradicts}
              </div>
            )}
            {evidence.conflictDetails && (
              <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200">
                <span className="font-semibold text-rose-400">Conflict Explanation: </span>
                {evidence.conflictDetails}
              </div>
            )}
          </div>

          {/* Raw Ingestion Payload */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
              <span className="flex items-center gap-1.5 uppercase tracking-wider">
                <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                Raw Telemetry Payload (JSON)
              </span>
              <span className="text-slate-500">Read-Only Telemetry Store</span>
            </div>
            <pre className="text-xs font-mono bg-[#03060c] p-4 rounded-lg border border-slate-800 text-cyan-300 overflow-x-auto">
              {JSON.stringify(evidence.rawPayload, null, 2)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#080d1a] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

interface ApprovalModalProps {
  action: ResponseAction | null;
  onConfirm: (actionId: string, analystNotes: string) => void;
  onCancel: () => void;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({ action, onConfirm, onCancel }) => {
  const [notes, setNotes] = useState('');
  const [acknowledgedBlastRadius, setAcknowledgedBlastRadius] = useState(false);

  if (!action) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#0d1424] border border-amber-500/40 rounded-xl shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-amber-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Human-in-the-Loop Gate
              </div>
              <h3 className="text-base font-semibold text-white">Approve Response Action</h3>
            </div>
          </div>
          <button onClick={onCancel} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="p-3 rounded-lg bg-[#060a14] border border-slate-800">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">Action Name</div>
            <div className="text-sm font-semibold text-white">{action.name}</div>
            <p className="text-xs text-slate-300 mt-1">{action.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#060a14] border border-slate-800">
              <span className="text-slate-400">Action Type</span>
              <p className="text-slate-200 font-semibold uppercase mt-0.5">{action.type}</p>
            </div>
            <div className="p-3 rounded-lg bg-[#060a14] border border-slate-800">
              <span className="text-slate-400">Risk Assessment</span>
              <p className={`font-semibold uppercase mt-0.5 ${
                action.riskLevel === 'High' ? 'text-rose-400' :
                action.riskLevel === 'Moderate' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {action.riskLevel} Risk
              </p>
            </div>
          </div>

          {/* Blast Radius Box */}
          <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-xs">
            <div className="text-rose-400 font-semibold mb-1 flex items-center gap-1.5 font-mono">
              <AlertTriangle className="w-3.5 h-3.5" />
              Blast Radius Evaluation:
            </div>
            <p className="text-slate-300 leading-relaxed">{action.blastRadius}</p>
          </div>

          {/* Analyst notes */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Analyst Justification & Verification Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Verified with Cloud Engineering Lead; split-tunnel routing anomaly confirmed. Rotating session as defensive hygiene."
              className="w-full h-20 px-3 py-2 text-xs font-mono rounded-lg bg-[#050811] border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/80 resize-none"
            />
          </div>

          {/* Checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300 pt-1">
            <input
              type="checkbox"
              checked={acknowledgedBlastRadius}
              onChange={(e) => setAcknowledgedBlastRadius(e.target.checked)}
              className="mt-0.5 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400"
            />
            <span>
              I confirm human review of contradictory evidence and approve immediate execution of this containment action.
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#080d1a] flex items-center justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!acknowledgedBlastRadius}
            onClick={() => onConfirm(action.id, notes)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
              acknowledgedBlastRadius
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Sign & Execute Action
          </button>
        </div>
      </div>
    </div>
  );
};
