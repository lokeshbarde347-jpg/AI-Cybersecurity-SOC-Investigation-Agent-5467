import React from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  AlertTriangle, 
  Database, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Flame, 
  Activity, 
  Workflow, 
  Layers,
  Scale,
  Sparkles,
  Lock,
  ChevronRight
} from 'lucide-react';
import { Alert, AgentNode, InvestigationCase } from '../types/soc';

interface DashboardOverviewProps {
  onNavigate: (tab: any) => void;
  alerts: Alert[];
  agents: AgentNode[];
  activeCase: InvestigationCase;
  pendingActionsCount: number;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
  alerts,
  agents,
  activeCase,
  pendingActionsCount,
}) => {
  const criticalAlertsCount = alerts.filter(a => a.severity === 'Critical').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Header / Kicker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPERATIONAL SOC DASHBOARD</span>
            <span className="text-slate-600">/</span>
            <span>MULTI-AGENT ORCHESTRATION</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Autonomous Investigation Command</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('workspace')}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 flex items-center gap-2 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            Open Active Case ({activeCase.id})
          </button>
        </div>
      </div>

      {/* Top 5 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Active Investigations */}
        <div className="p-4 rounded-xl bg-[#091122] border border-cyan-900/40 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Active Investigations</span>
            <Terminal className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white tabular-nums">08</span>
            <span className="text-xs font-mono text-cyan-400">+2 escalated today</span>
          </div>
          <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 rounded-full" style={{ width: '70%' }} />
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="p-4 rounded-xl bg-[#091122] border border-rose-900/40 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Critical Alerts</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-rose-400 tabular-nums">03</span>
            <span className="text-xs font-mono text-rose-300/80">Immediate review</span>
          </div>
          <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500 rounded-full" style={{ width: '85%' }} />
          </div>
        </div>

        {/* Evidence Sources */}
        <div className="p-4 rounded-xl bg-[#091122] border border-blue-900/40 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Evidence Sources</span>
            <Database className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white tabular-nums">24</span>
            <span className="text-xs font-mono text-emerald-400">1 degraded</span>
          </div>
          <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }} />
          </div>
        </div>

        {/* Average Confidence */}
        <div className="p-4 rounded-xl bg-[#091122] border border-purple-900/40 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Average Confidence</span>
            <Scale className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-purple-300 tabular-nums">87%</span>
            <span className="text-xs font-mono text-slate-400">Bayesian calc</span>
          </div>
          <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '87%' }} />
          </div>
        </div>

        {/* Pending Actions */}
        <div className="p-4 rounded-xl bg-[#091122] border border-amber-900/40 relative overflow-hidden col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Pending Actions</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-amber-400 tabular-nums">
              {pendingActionsCount < 10 ? `0${pendingActionsCount}` : pendingActionsCount}
            </span>
            <span className="text-xs font-mono text-amber-300/80">HITL Required</span>
          </div>
          <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }} />
          </div>
        </div>

      </div>

      {/* Featured Active Case Spotlight */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0d162a] via-[#091122] to-[#070d1a] border border-cyan-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                CASE {activeCase.id}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/30 font-semibold uppercase">
                {activeCase.severity} SEVERITY
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                CONTRADICTION DETECTED
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Initiated at {activeCase.startedAt}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              {activeCase.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Target: <span className="font-semibold text-white">{activeCase.user}</span> ({activeCase.userRole}) · Device: <span className="font-mono text-cyan-300">{activeCase.device}</span> · Okta login Frankfurt am Main vs Palo Alto VPN Tokyo gateway collision.
            </p>

            {/* Assessment pills */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono">
              <div className="p-2 rounded-lg bg-[#060a14] border border-slate-800">
                <span className="text-slate-400">Verdict: </span>
                <span className="text-amber-400 font-semibold">Gateway Split-Tunnel Anomaly</span>
              </div>
              <div className="p-2 rounded-lg bg-[#060a14] border border-slate-800">
                <span className="text-slate-400">Confidence: </span>
                <span className="text-cyan-300 font-semibold">{activeCase.assessment.overallConfidence}</span>
              </div>
              <div className="p-2 rounded-lg bg-[#060a14] border border-slate-800">
                <span className="text-slate-400">Evidence Quality: </span>
                <span className="text-emerald-400 font-semibold">{activeCase.assessment.evidenceQuality}</span>
              </div>
              <div className="p-2 rounded-lg bg-[#060a14] border border-slate-800">
                <span className="text-slate-400">Data Completeness: </span>
                <span className="text-amber-400 font-semibold">{activeCase.assessment.dataCompleteness}</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => onNavigate('workspace')}
              className="px-5 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <span>Investigate Case in Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contradictions')}
              className="px-5 py-3 rounded-xl text-xs font-semibold bg-[#070e1c] hover:bg-[#0c162c] text-amber-300 border border-amber-500/30 flex items-center justify-center gap-2 transition-all"
            >
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Inspect Contradiction Proof</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two-Column Lower Section: Multi-Agent Cluster & Live Alerts Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 6 Autonomous Agents Status */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Workflow className="w-4 h-4 text-purple-400" />
              Active Autonomous Agents (6)
            </h3>
            <button 
              onClick={() => onNavigate('agents')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
            >
              Open Pipeline Graph <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {agents.map((agent) => (
              <div 
                key={agent.id}
                onClick={() => onNavigate('agents')}
                className="p-3.5 rounded-xl bg-[#091122] border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {agent.name}
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded uppercase ${
                    agent.status === 'completed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' :
                    agent.status === 'conflict' ? 'bg-amber-950 text-amber-300 border border-amber-500/30' :
                    agent.status === 'warning' ? 'bg-rose-950 text-rose-300 border border-rose-500/30' :
                    'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                  }`}>
                    {agent.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {agent.task}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800/80">
                  <span>{agent.evidenceProcessed} records</span>
                  <span className="text-cyan-400 font-semibold">{agent.confidence}% conf</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Alert Ingestion Queue */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Incoming Alert Triage Feed
            </h3>
            <button 
              onClick={() => onNavigate('alerts')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
            >
              View All Alerts ({alerts.length}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {alerts.slice(0, 4).map((alert) => (
              <div 
                key={alert.id}
                onClick={() => onNavigate('workspace')}
                className="p-3 rounded-xl bg-[#091122] border border-slate-800 hover:border-cyan-500/30 cursor-pointer transition-colors flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-lg shrink-0 ${
                    alert.severity === 'Critical' ? 'bg-rose-950/60 text-rose-400 border border-rose-500/30' :
                    alert.severity === 'High' ? 'bg-amber-950/60 text-amber-400 border border-amber-500/30' :
                    'bg-blue-950/60 text-blue-400 border border-blue-500/30'
                  }`}>
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                        {alert.type}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                        {alert.id}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {alert.user} · <span className="font-mono text-slate-500">{alert.device}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-semibold text-cyan-400">
                    {alert.confidence}% conf
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    {alert.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
