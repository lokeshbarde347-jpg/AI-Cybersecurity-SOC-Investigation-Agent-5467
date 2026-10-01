import React from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Play, 
  FileText, 
  Cpu, 
  Database, 
  Workflow, 
  BarChart3, 
  Layers, 
  Radio,
  Flame,
  Scale
} from 'lucide-react';

export type NavTab = 
  | 'landing'
  | 'overview'
  | 'workspace'
  | 'alerts'
  | 'agents'
  | 'evidence'
  | 'contradictions'
  | 'reasoning'
  | 'response'
  | 'analytics'
  | 'reports';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onLaunchSimulation: () => void;
  isSimulating: boolean;
  activeCaseId: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onLaunchSimulation,
  isSimulating,
  activeCaseId,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-900/30 bg-[#060a14]/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 lg:px-6 h-14">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <ShieldAlert className="w-4 h-4 text-cyan-300" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              <span>AegisSOC</span>
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 hidden sm:inline-block">
                AI Investigation Agent
              </span>
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                : 'hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            SOC Overview
          </button>

          <button
            onClick={() => setActiveTab('workspace')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'workspace'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Workspace
            <span className="text-[10px] font-mono px-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              {activeCaseId}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'alerts'
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                : 'hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Alerts
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          </button>

          <button
            onClick={() => setActiveTab('agents')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'agents'
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                : 'hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Workflow className="w-3.5 h-3.5 text-purple-400" />
            Agents (6)
          </button>

          <button
            onClick={() => setActiveTab('evidence')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'evidence'
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                : 'hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            Evidence Ledger
          </button>

          <button
            onClick={() => setActiveTab('contradictions')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'contradictions'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'hover:text-amber-200 hover:bg-slate-800/50 text-amber-400/90'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            Contradictions
          </button>

          <button
            onClick={() => setActiveTab('reasoning')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'reasoning'
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                : 'hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            AI Log
          </button>

          <button
            onClick={() => setActiveTab('response')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'response'
                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                : 'hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            Response Center
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'analytics'
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                : 'hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
            Analytics
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'reports'
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                : 'hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            Report
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          {/* Responsive Nav selector on smaller screens */}
          <div className="xl:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as NavTab)}
              className="text-xs bg-[#0b1324] border border-cyan-500/30 rounded-lg px-2.5 py-1.5 text-cyan-300 font-mono focus:outline-none"
            >
              <option value="landing">Command Center</option>
              <option value="overview">SOC Overview</option>
              <option value="workspace">Workspace ({activeCaseId})</option>
              <option value="alerts">Alerts (7)</option>
              <option value="agents">Multi-Agent Pipeline</option>
              <option value="evidence">Evidence Ledger</option>
              <option value="contradictions">Contradiction Inspector</option>
              <option value="reasoning">AI Reasoning Log</option>
              <option value="response">Response Center</option>
              <option value="analytics">Analytics</option>
              <option value="reports">Incident Report</option>
            </select>
          </div>

          {/* Quick simulation trigger */}
          <button
            onClick={onLaunchSimulation}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-md ${
              isSimulating
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-wait'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-cyan-500/20'
            }`}
          >
            {isSimulating ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Simulating Incident...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Simulated Incident</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
