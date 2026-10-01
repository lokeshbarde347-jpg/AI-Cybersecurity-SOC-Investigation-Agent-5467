import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Activity, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Scale, 
  Workflow, 
  Layers
} from 'lucide-react';
import { AgentNode, Alert } from '../types/soc';

interface AnalyticsViewProps {
  alerts: Alert[];
  agents: AgentNode[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ alerts, agents }) => {
  const severityCounts = {
    Critical: alerts.filter(a => a.severity === 'Critical').length,
    High: alerts.filter(a => a.severity === 'High').length,
    Medium: alerts.filter(a => a.severity === 'Medium').length,
    Low: alerts.filter(a => a.severity === 'Low').length,
  };

  const sources = [
    { name: 'Okta Identity Cloud', count: 18, share: '32%' },
    { name: 'Palo Alto GlobalProtect', count: 14, share: '24%' },
    { name: 'CrowdStrike Falcon EDR', count: 11, share: '19%' },
    { name: 'AWS CloudTrail', count: 9, share: '15%' },
    { name: 'Google Workspace Audit', count: 6, share: '10%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>SOC METRICS & TELEMETRY</span>
            <span className="text-slate-600">/</span>
            <span>INVESTIGATION PERFORMANCE</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Cybersecurity Investigation Analytics</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Operational visibility across alert volume, agent cycle times, contradiction incidence, and evidence reliability.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-[#091122] p-2.5 rounded-lg border border-slate-800">
          Telemetry Period: <span className="text-cyan-300 font-bold">Past 24 Hours</span>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-[#091122] border border-cyan-900/40">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Mean Time To Deduce</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-3xl font-bold font-mono text-cyan-300 tabular-nums">4.2s</div>
          <p className="text-[11px] text-emerald-400 font-mono mt-1">−98% vs 45 min human SLA</p>
        </div>

        <div className="p-4 rounded-xl bg-[#091122] border border-purple-900/40">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Contradiction Rate</span>
            <Scale className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 text-3xl font-bold font-mono text-purple-300 tabular-nums">34.2%</div>
          <p className="text-[11px] text-slate-400 font-mono mt-1">Alerts with conflicting logs</p>
        </div>

        <div className="p-4 rounded-xl bg-[#091122] border border-emerald-900/40">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>False-Positive Reduction</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-3xl font-bold font-mono text-emerald-400 tabular-nums">68.4%</div>
          <p className="text-[11px] text-slate-400 font-mono mt-1">Prevented account lockouts</p>
        </div>

        <div className="p-4 rounded-xl bg-[#091122] border border-blue-900/40">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Telemetry Records/Sec</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 text-3xl font-bold font-mono text-blue-300 tabular-nums">14,250</div>
          <p className="text-[11px] text-cyan-400 font-mono mt-1">Real-time pipeline ingestion</p>
        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Severity Distribution */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#070d1a] border border-slate-800 space-y-4">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Alerts by Severity Distribution
          </h3>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-rose-400 font-semibold">Critical ({severityCounts.Critical})</span>
                <span className="text-slate-400">42%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-amber-400 font-semibold">High ({severityCounts.High})</span>
                <span className="text-slate-400">28%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-blue-400 font-semibold">Medium ({severityCounts.Medium})</span>
                <span className="text-slate-400">20%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300 font-semibold">Low ({severityCounts.Low})</span>
                <span className="text-slate-400">10%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="h-full bg-slate-500 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Ingestion Sources */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#070d1a] border border-slate-800 space-y-4">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Top Evidence Sources Breakdown
          </h3>

          <div className="space-y-3 pt-2">
            {sources.map((src) => (
              <div key={src.name} className="flex items-center justify-between text-xs">
                <div className="truncate pr-2">
                  <div className="font-semibold text-white truncate">{src.name}</div>
                  <div className="text-[10px] font-mono text-slate-500">{src.count} active connectors</div>
                </div>
                <div className="text-right font-mono font-bold text-cyan-400 shrink-0">
                  {src.share}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Activity & Cycle Times */}
        <div className="lg:col-span-12 p-5 rounded-2xl bg-[#070d1a] border border-slate-800 space-y-4">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Workflow className="w-4 h-4 text-purple-400" />
            Autonomous Agent Activity & Cycle Execution Latencies
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {agents.map((agent) => (
              <div key={agent.id} className="p-3.5 rounded-xl bg-[#091122] border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-white truncate">{agent.name}</div>
                <div className="text-lg font-bold font-mono text-purple-300 tabular-nums">
                  {agent.runtimeMs}ms
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {agent.evidenceProcessed} records · {agent.confidence}% conf
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400" style={{ width: `${Math.min(100, (agent.runtimeMs / 700) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
