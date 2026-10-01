import React, { useState } from 'react';
import { 
  Terminal, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2, 
  Workflow, 
  RotateCcw,
  Sparkles,
  ArrowDown
} from 'lucide-react';
import { AgentActivityLog } from '../types/soc';

interface AiReasoningStreamProps {
  logs: AgentActivityLog[];
  onOpenWorkspace: () => void;
}

export const AiReasoningStream: React.FC<AiReasoningStreamProps> = ({
  logs,
  onOpenWorkspace,
}) => {
  const [selectedAgentFilter, setSelectedAgentFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesAgent = selectedAgentFilter === 'ALL' || log.agent === selectedAgentFilter;
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.agent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAgent && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>ACTIVITY & REASONING STREAM</span>
            <span className="text-slate-600">/</span>
            <span>CHRONOLOGICAL EXECUTION AUDIT</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Multi-Agent Thought & Deduction Stream</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent real-time trace of every query, correlation hypothesis, contradiction flag, and Bayesian calculation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search thoughts, queries..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#091122] border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs by Agent */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#091122] border border-slate-800 rounded-lg text-xs font-mono">
          {['ALL', 'Alert Triage Agent', 'Log Analyst Agent', 'Threat Correlator Agent', 'Investigator Agent', 'Risk Agent', 'Response Agent'].map((agentName) => (
            <button
              key={agentName}
              onClick={() => setSelectedAgentFilter(agentName)}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedAgentFilter === agentName
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {agentName.replace(' Agent', '')}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-400">
          Showing <span className="text-cyan-400 font-bold">{filteredLogs.length}</span> trace events
        </div>
      </div>

      {/* Stream Timeline Container */}
      <div className="p-6 rounded-2xl bg-[#070d1a] border border-slate-800 shadow-xl space-y-4">
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
          {filteredLogs.map((log) => {
            const isConflict = log.status === 'Evidence Conflict';
            const isWarning = log.status === 'Warning';
            const isProcessing = log.status === 'Processing';

            return (
              <div key={log.id} className="relative group">
                {/* Node icon */}
                <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isConflict ? 'bg-amber-500 border-amber-300 animate-pulse' :
                  isWarning ? 'bg-rose-500 border-rose-300' :
                  isProcessing ? 'bg-cyan-500 border-cyan-300' :
                  'bg-emerald-500 border-emerald-300'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                </div>

                {/* Log Card */}
                <div className="p-4 rounded-xl bg-[#091122] border border-slate-800/80 hover:border-cyan-500/30 transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-cyan-400 font-bold">{log.timestamp}</span>
                      <span className="text-slate-600">·</span>
                      <span className="font-mono font-semibold text-purple-300">{log.agent}</span>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase w-fit ${
                      isConflict ? 'bg-amber-950 text-amber-300 border border-amber-500/40 flex items-center gap-1' :
                      isWarning ? 'bg-rose-950 text-rose-300 border border-rose-500/40' :
                      isProcessing ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' :
                      'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {isConflict && <AlertTriangle className="w-3 h-3" />}
                      {log.status}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-white tracking-wide">
                    {log.action}
                  </div>

                  <p className="text-xs text-slate-300 font-mono leading-relaxed bg-[#060a14] p-3 rounded-lg border border-slate-800">
                    {log.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
