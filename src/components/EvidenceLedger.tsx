import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  RotateCcw,
  FileCode,
  Layers,
  HelpCircle,
  Eye
} from 'lucide-react';
import { EvidenceItem } from '../types/soc';

interface EvidenceLedgerProps {
  evidenceList: EvidenceItem[];
  onInspectEvidence: (evidence: EvidenceItem) => void;
}

export const EvidenceLedger: React.FC<EvidenceLedgerProps> = ({
  evidenceList,
  onInspectEvidence,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'conflicts' | 'high_rel' | 'unavailable'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvidence = evidenceList.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supports.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'conflicts') return item.hasConflict;
    if (filterType === 'high_rel') return item.reliability === 'HIGH';
    if (filterType === 'unavailable') return item.isUnavailable;

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>EVIDENCE REPOSITORY</span>
            <span className="text-slate-600">/</span>
            <span>CRYPTOGRAPHIC CORROBORATION LEDGER</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Multi-Source Evidence Ledger</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Every AI deduction is strictly bounded to verifiable telemetry records. No hallucinated claims permitted.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search evidence ID, source..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#091122] border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Filter Segmented Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-[#091122] border border-slate-800 rounded-lg">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
              filterType === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Evidence ({evidenceList.length})
          </button>

          <button
            onClick={() => setFilterType('conflicts')}
            className={`px-3 py-1 text-xs font-mono rounded-md transition-colors flex items-center gap-1.5 ${
              filterType === 'conflicts'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-amber-400/80 hover:text-amber-300'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Conflicts ({evidenceList.filter(e => e.hasConflict).length})
          </button>

          <button
            onClick={() => setFilterType('high_rel')}
            className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
              filterType === 'high_rel'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            High Reliability ({evidenceList.filter(e => e.reliability === 'HIGH').length})
          </button>

          <button
            onClick={() => setFilterType('unavailable')}
            className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
              filterType === 'unavailable'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Unavailable Sources ({evidenceList.filter(e => e.isUnavailable).length})
          </button>
        </div>

        {/* Scientific Rule Note */}
        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Rule: Conflicting evidence automatically caps attack confidence at 50%</span>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#070d1a]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-[#091122]/90 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Evidence ID</th>
              <th className="py-3 px-4">Telemetry Source</th>
              <th className="py-3 px-4">Observed Event</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Reliability</th>
              <th className="py-3 px-4">Supports Hypothesis</th>
              <th className="py-3 px-4">Contradicts Hypothesis</th>
              <th className="py-3 px-4 text-right">Raw Telemetry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-xs">
            {filteredEvidence.map((ev) => (
              <tr
                key={ev.id}
                onClick={() => onInspectEvidence(ev)}
                className={`cursor-pointer transition-colors group ${
                  ev.hasConflict ? 'bg-amber-950/15 hover:bg-amber-950/25' : 'hover:bg-[#0b1426]'
                }`}
              >
                {/* ID */}
                <td className="py-3.5 px-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span>{ev.id}</span>
                    {ev.hasConflict && (
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                        CONFLICT
                      </span>
                    )}
                    {ev.isUnavailable && (
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-500/40">
                        SOURCE UNAVAILABLE
                      </span>
                    )}
                  </div>
                </td>

                {/* Source */}
                <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                  {ev.source}
                </td>

                {/* Event */}
                <td className="py-3.5 px-4 text-slate-300 min-w-[280px]">
                  <div>{ev.event}</div>
                  {ev.conflictDetails && (
                    <div className="text-[11px] text-amber-300/90 font-mono mt-1">
                      ⚠ {ev.conflictDetails}
                    </div>
                  )}
                </td>

                {/* Timestamp */}
                <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                  {ev.timestamp}
                </td>

                {/* Reliability */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    ev.reliability === 'HIGH' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' :
                    ev.reliability === 'MEDIUM' ? 'bg-amber-950 text-amber-300 border border-amber-500/30' :
                    'bg-rose-950 text-rose-300 border border-rose-500/30'
                  }`}>
                    {ev.reliability}
                  </span>
                </td>

                {/* Supports */}
                <td className="py-3.5 px-4 text-emerald-300 min-w-[180px]">
                  <span className="font-mono text-[11px]">{ev.supports}</span>
                </td>

                {/* Contradicts */}
                <td className="py-3.5 px-4 text-amber-300 min-w-[180px]">
                  <span className="font-mono text-[11px]">{ev.contradicts || '—'}</span>
                </td>

                {/* Inspect Button */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onInspectEvidence(ev);
                    }}
                    className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono inline-flex items-center gap-1 transition-colors"
                  >
                    <FileCode className="w-3 h-3 text-cyan-400" />
                    <span>Payload</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
