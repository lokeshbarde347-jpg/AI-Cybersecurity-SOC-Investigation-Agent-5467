import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  ArrowUpDown, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Terminal,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { Alert, Severity } from '../types/soc';

interface AlertsInboxProps {
  alerts: Alert[];
  onSelectAlert: (alert: Alert) => void;
  selectedAlertId: string;
}

export const AlertsInbox: React.FC<AlertsInboxProps> = ({
  alerts,
  onSelectAlert,
  selectedAlertId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = severityFilter === 'ALL' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || alert.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Title & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>ALERT TRIAGE INBOX</span>
            <span className="text-slate-600">/</span>
            <span>MULTI-SOURCE TELEMETRY INGESTION</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Security Alert Queue</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any alert to launch multi-agent cross-correlation in the Investigation Workspace.
          </p>
        </div>

        {/* Search & Reset */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user, IP, rule..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#091122] border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {(searchQuery || severityFilter !== 'ALL' || statusFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSeverityFilter('ALL');
                setStatusFilter('ALL');
              }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs / Segmented Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Severity Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#091122] border border-slate-800 rounded-lg">
          {['ALL', 'Critical', 'High', 'Medium', 'Low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                severityFilter === sev
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Quick count */}
        <div className="text-xs font-mono text-slate-400">
          Showing <span className="text-cyan-400 font-bold">{filteredAlerts.length}</span> of {alerts.length} alerts
        </div>
      </div>

      {/* Alert Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#070d1a]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-[#091122]/90 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Alert ID</th>
              <th className="py-3 px-4">Alert Type</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Device</th>
              <th className="py-3 px-4">Source</th>
              <th className="py-3 px-4">Severity</th>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Confidence</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-xs">
            {filteredAlerts.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-slate-500 font-mono">
                  No alerts match your filter criteria.
                </td>
              </tr>
            ) : (
              filteredAlerts.map((alert) => {
                const isSelected = alert.id === selectedAlertId;
                return (
                  <tr
                    key={alert.id}
                    onClick={() => onSelectAlert(alert)}
                    className={`cursor-pointer transition-colors group ${
                      isSelected
                        ? 'bg-cyan-950/40 border-l-2 border-l-cyan-400'
                        : 'hover:bg-[#0b1426]'
                    }`}
                  >
                    {/* Alert ID */}
                    <td className="py-3 px-4 font-mono text-cyan-400 font-semibold whitespace-nowrap">
                      {alert.id}
                    </td>

                    {/* Alert Type */}
                    <td className="py-3 px-4 font-semibold text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span>{alert.type}</span>
                        {alert.type === 'IMPOSSIBLE TRAVEL' && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                            DEMO
                          </span>
                        )}
                      </div>
                    </td>

                    {/* User */}
                    <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                      <div>{alert.user}</div>
                      <div className="text-[10px] font-mono text-slate-500">{alert.userEmail}</div>
                    </td>

                    {/* Device */}
                    <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">
                      {alert.device}
                    </td>

                    {/* Source */}
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                      {alert.source}
                    </td>

                    {/* Severity Badge */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        alert.severity === 'Critical' ? 'bg-rose-950 text-rose-300 border border-rose-500/40' :
                        alert.severity === 'High' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                        alert.severity === 'Medium' ? 'bg-blue-950 text-blue-300 border border-blue-500/40' :
                        'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {alert.severity}
                      </span>
                    </td>

                    {/* Time */}
                    <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">
                      {alert.time}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        alert.status === 'Contradiction Detected' ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30 flex items-center gap-1 w-fit' :
                        alert.status === 'Investigating' ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30' :
                        alert.status === 'Mitigated' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {alert.status === 'Contradiction Detected' && <AlertTriangle className="w-2.5 h-2.5" />}
                        {alert.status}
                      </span>
                    </td>

                    {/* Confidence */}
                    <td className="py-3 px-4 text-right font-mono font-semibold text-cyan-300 whitespace-nowrap tabular-nums">
                      {alert.confidence}%
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectAlert(alert);
                        }}
                        className="px-2.5 py-1 text-xs rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <Terminal className="w-3 h-3" />
                        <span>Investigate</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
