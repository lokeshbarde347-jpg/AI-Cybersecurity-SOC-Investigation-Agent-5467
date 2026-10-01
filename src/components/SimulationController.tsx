import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Terminal, 
  ArrowRight, 
  X,
  FastForward,
  Cpu,
  UserCheck
} from 'lucide-react';

interface SimulationControllerProps {
  isOpen: boolean;
  onClose: () => void;
  onFinishAndOpenWorkspace: () => void;
}

export const SimulationController: React.FC<SimulationControllerProps> = ({
  isOpen,
  onClose,
  onFinishAndOpenWorkspace,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const simulationSteps = [
    {
      title: 'Alert Ingestion & Normalization',
      agent: 'Alert Triage Agent',
      timestamp: '10:24:18 UTC',
      detail: 'Received ALT-9821: Impossible Travel. Normalized payload across Okta SSO & GlobalProtect VPN logs.',
      status: 'nominal',
      delayMs: 1600,
    },
    {
      title: 'Telemetry Extraction',
      agent: 'Log Analyst Agent',
      timestamp: '10:24:20 UTC',
      detail: 'Queried authentication database. Confirmed FIDO2 login from Frankfurt IP at 10:14, then Tokyo VPN at 10:16.',
      status: 'nominal',
      delayMs: 1800,
    },
    {
      title: 'Cross-Source Discrepancy Flagged',
      agent: 'Threat Correlator Agent',
      timestamp: '10:24:24 UTC',
      detail: 'FLAGGED CONFLICT: Jamf MDM heartbeat proves physical hardware remained in Frankfurt on office WiFi BSSID. Velocity 284,000 km/h is physically impossible.',
      status: 'conflict',
      delayMs: 2200,
    },
    {
      title: 'Hypothesis Formulation',
      agent: 'Investigator Agent',
      timestamp: '10:24:28 UTC',
      detail: 'Constructed 6-point timeline. Identified Tokyo IP as internal corporate egress proxy. Generated Gateway Routing Hypothesis (74%).',
      status: 'nominal',
      delayMs: 2000,
    },
    {
      title: 'Bayesian Confidence & Missing Data Audit',
      agent: 'Risk Agent',
      timestamp: '10:24:32 UTC',
      detail: 'Assigned Confidence: MEDIUM. Evidence Quality: HIGH. Penalized 14% for missing edge packet captures.',
      status: 'warning',
      delayMs: 1800,
    },
    {
      title: 'Proportional Remediation & Human Gate',
      agent: 'Response Agent',
      timestamp: '10:24:35 UTC',
      detail: 'Recommended out-of-band verification and targeted Tokyo session revocation. Suspended destructive host isolation.',
      status: 'completed',
      delayMs: 2200,
    },
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    if (currentStep < simulationSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, simulationSteps[currentStep].delayMs);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [isOpen, isPlaying, currentStep]);

  if (!isOpen) return null;

  const current = simulationSteps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#091122] border-2 border-cyan-500/50 rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-900/40 bg-[#060a16]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                <span>Autonomous Incident Simulation</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <h3 className="text-base font-bold text-white">Live Investigation Walkthrough</h3>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Progress Indicator */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>Step {currentStep + 1} of {simulationSteps.length}</span>
              <span className="text-cyan-300 font-bold">{current.agent}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / simulationSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Active Step Highlight Box */}
          <div className={`p-5 rounded-xl border transition-all ${
            current.status === 'conflict' ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-950/40' :
            current.status === 'warning' ? 'bg-purple-950/30 border-purple-500/50' :
            'bg-[#060a14] border-cyan-500/40'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-cyan-400">{current.timestamp}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                current.status === 'conflict' ? 'bg-amber-950 text-amber-300 border border-amber-500/40 flex items-center gap-1' :
                'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
              }`}>
                {current.status === 'conflict' && <AlertTriangle className="w-3 h-3" />}
                {current.status === 'conflict' ? 'Contradiction Flagged' : 'Agent Executing'}
              </span>
            </div>

            <h4 className="text-lg font-bold text-white tracking-tight">{current.title}</h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-mono leading-relaxed">
              {current.detail}
            </p>
          </div>

          {/* Stepper Dots */}
          <div className="grid grid-cols-6 gap-2">
            {simulationSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentStep(idx);
                  setIsPlaying(false);
                }}
                className={`p-2 rounded-lg border text-center transition-all ${
                  idx === currentStep ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' :
                  idx < currentStep ? 'bg-[#060a14] border-slate-700 text-slate-400' :
                  'bg-[#060a14]/40 border-slate-800 text-slate-600'
                }`}
              >
                <div className="text-[10px] font-mono font-bold">{idx + 1}</div>
                <div className="text-[9px] truncate">{step.title.split(' ')[0]}</div>
              </button>
            ))}
          </div>

        </div>

        {/* Footer with Controls */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#060a16] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={() => {
                setCurrentStep(0);
                setIsPlaying(true);
              }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Restart Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {currentStep < simulationSteps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center gap-1.5"
              >
                <span>Next Stage</span>
                <FastForward className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onFinishAndOpenWorkspace}
                className="px-5 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
              >
                <Terminal className="w-4 h-4" />
                <span>Open Full Investigation Workspace</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
