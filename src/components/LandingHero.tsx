import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Workflow, 
  Search, 
  GitBranch, 
  Scale, 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  Database, 
  Layers, 
  Radio, 
  AlertTriangle,
  CheckCircle2,
  Lock,
  Play
} from 'lucide-react';
import { AgentNode } from '../types/soc';

interface LandingHeroProps {
  onLaunchInvestigation: () => void;
  onRunSimulation: () => void;
  agents: AgentNode[];
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onLaunchInvestigation,
  onRunSimulation,
  agents,
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('agent-correlator');

  const selectedAgent = agents.find(a => a.id === selectedAgentId) || agents[2];

  // Visual layout for the 6 nodes orbiting the central core
  const nodes = [
    { id: 'agent-triage', name: 'Alert Triage', x: 260, y: 70, color: '#38bdf8', icon: ShieldAlert },
    { id: 'agent-log-analyst', name: 'Log Analyst', x: 440, y: 130, color: '#06b6d4', icon: Search },
    { id: 'agent-correlator', name: 'Threat Correlator', x: 450, y: 310, color: '#a855f7', icon: GitBranch },
    { id: 'agent-investigator', name: 'Investigator', x: 300, y: 410, color: '#ec4899', icon: Terminal },
    { id: 'agent-risk', name: 'Risk Agent', x: 120, y: 340, color: '#f59e0b', icon: Scale },
    { id: 'agent-response', name: 'Response Agent', x: 90, y: 150, color: '#10b981', icon: ShieldCheck },
  ];

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] flex flex-col justify-between overflow-hidden soc-grid-bg">
      {/* Background radial gradient */}
      <div className="absolute inset-0 soc-radial-glow pointer-events-none" />

      {/* Main hero section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission & Hero Copy */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top pill-free kicker */}
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>AUTONOMOUS MULTI-AGENT SOC FRAMEWORK</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">ZERO-HALLUCINATION ENGINE</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                AI Cybersecurity <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">SOC Investigation</span> Agent
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-300 leading-snug">
                From Security Alert to Root Cause — Evidence-Based Response
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              Investigate alerts like a SOC analyst. Correlate evidence, build timelines, challenge assumptions, quantify confidence, and recommend response actions.
            </p>

            {/* Core Differentiator Banner */}
            <div className="p-4 rounded-xl bg-[#091122]/90 border border-cyan-500/25 shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-semibold uppercase tracking-wider">
                <Scale className="w-4 h-4 text-amber-400" />
                The Core Differentiator
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                <span className="text-cyan-400 font-bold">DETECT → INVESTIGATE → EXPLAIN → RESPOND</span>
                <br />
                Unlike generic LLMs that guess, AegisSOC explicitly accounts for contradictory evidence, missing telemetry sources, and corporate proxy anomalies before making conclusions.
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onLaunchInvestigation}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch Investigation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onRunSimulation}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-[#0c162c] hover:bg-[#121f3d] text-cyan-300 border border-cyan-500/30 flex items-center gap-2.5 transition-all shadow-md"
              >
                <Play className="w-4 h-4 fill-current text-cyan-400" />
                <span>View Live Demo (Impossible Travel Case)</span>
              </button>
            </div>

            {/* Live Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div>
                <div className="text-xs font-mono text-slate-400">Mean Time To Deduce</div>
                <div className="text-lg font-bold font-mono text-cyan-300 tabular-nums">4.2s</div>
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">False-Positive Drop</div>
                <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums">−68%</div>
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">Analyst Control</div>
                <div className="text-lg font-bold font-mono text-purple-400 tabular-nums">100% HITL</div>
              </div>
            </div>

          </div>

          {/* Right Column: Futuristic Multi-Agent Visualization */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-[560px] aspect-square rounded-2xl bg-[#080e1c]/80 border border-cyan-900/40 p-4 shadow-2xl flex flex-col items-center justify-center">
              
              {/* SVG connection canvas */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 500">
                <defs>
                  <linearGradient id="cyberLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  </linearGradient>
                  
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Orbit rings */}
                <circle cx="270" cy="250" r="160" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="270" cy="250" r="100" fill="none" stroke="#0e7490" strokeWidth="1" strokeOpacity="0.25" />

                {/* Animated Lines connecting Core to each Node */}
                {nodes.map((node) => (
                  <g key={`line-${node.id}`}>
                    <line
                      x1="270"
                      y1="250"
                      x2={node.x}
                      y2={node.y}
                      stroke={selectedAgentId === node.id ? '#38bdf8' : '#334155'}
                      strokeWidth={selectedAgentId === node.id ? '2' : '1'}
                      strokeDasharray={selectedAgentId === node.id ? 'none' : '2 3'}
                      className="transition-all duration-300"
                    />
                    {/* Animated packet traveling */}
                    <circle
                      r={selectedAgentId === node.id ? '3.5' : '2'}
                      fill={node.color}
                      filter="url(#glow)"
                    >
                      <animateMotion
                        path={`M 270 250 L ${node.x} ${node.y} Z`}
                        dur={`${2.5 + Math.random()}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                ))}
              </svg>

              {/* Central AI Investigation Core */}
              <div className="absolute top-[250px] left-[270px] -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-600 via-blue-900 to-purple-900 border-2 border-cyan-400 p-0.5 flex flex-col items-center justify-center text-center shadow-[0_0_35px_rgba(6,182,212,0.4)] animate-pulse">
                    <Cpu className="w-6 h-6 text-cyan-200 mb-0.5" />
                    <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                      Shared Core
                    </span>
                    <span className="text-[8px] font-mono text-cyan-300">
                      Case State
                    </span>
                  </div>
                  {/* Subtle ping ring */}
                  <div className="absolute -inset-2 rounded-full border border-cyan-400/40 animate-ping pointer-events-none" />
                </div>
              </div>

              {/* Interactive Agent Nodes around core */}
              {nodes.map((node) => {
                const IconComponent = node.icon;
                const isSelected = selectedAgentId === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedAgentId(node.id)}
                    style={{ left: `${node.x}px`, top: `${node.y}px` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center p-2 rounded-xl transition-all duration-200 group ${
                      isSelected
                        ? 'bg-[#0f1d38] border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-110'
                        : 'bg-[#0a1224] border border-slate-700/80 hover:border-slate-500 hover:scale-105'
                    }`}
                  >
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-1 transition-colors"
                      style={{ backgroundColor: `${node.color}20`, color: node.color }}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-200 whitespace-nowrap">
                      {node.name}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      {isSelected ? 'ACTIVE' : 'READY'}
                    </span>
                  </button>
                );
              })}

              {/* Inspector card docked at the bottom of the widget */}
              <div className="absolute bottom-3 inset-x-4 z-30 p-3.5 rounded-xl bg-[#060a16]/95 border border-cyan-500/30 backdrop-blur-md">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-cyan-300 font-mono">
                      {selectedAgent.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                      {selectedAgent.confidence}% Confidence
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {selectedAgent.evidenceProcessed} Telemetry Records
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {selectedAgent.output}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Feature Pillars Footer Grid */}
      <div className="border-t border-slate-800/80 bg-[#040711]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/20 text-cyan-400 shrink-0">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Multi-Source Ingestion</h4>
                <p className="text-xs text-slate-400 mt-1">Cross-correlates Okta, Palo Alto, AWS CloudTrail, and CrowdStrike EDR.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-500/20 text-purple-400 shrink-0">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contradiction Engine</h4>
                <p className="text-xs text-slate-400 mt-1">Identifies corporate gateways vs account takeover. Zero blind trust.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-500/20 text-amber-400 shrink-0">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Uncertainty & Penalties</h4>
                <p className="text-xs text-slate-400 mt-1">Explicitly lowers confidence when telemetry is partial or unavailable.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Human-in-the-Loop</h4>
                <p className="text-xs text-slate-400 mt-1">AI proposes blast-radius-aware actions; human analyst signs off.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
