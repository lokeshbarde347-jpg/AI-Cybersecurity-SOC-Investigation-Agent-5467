export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export type AlertStatus = 
  | 'New' 
  | 'Investigating' 
  | 'Triage' 
  | 'Contradiction Detected' 
  | 'Mitigated' 
  | 'Closed';

export type ConfidenceLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Alert {
  id: string;
  type: string;
  user: string;
  userEmail: string;
  device: string;
  source: string;
  severity: Severity;
  time: string;
  timestamp: string;
  status: AlertStatus;
  confidence: number;
  location: string;
  ip: string;
  description: string;
  mitreTactic: string;
  mitreId: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  timestamp: string;
  title: string;
  description: string;
  source: string;
  user: string;
  device: string;
  location?: string;
  ip?: string;
  severity: 'nominal' | 'anomaly' | 'suspicious' | 'critical';
  evidenceId?: string;
  mitreTechnique?: string;
  contradiction?: boolean;
}

export interface EvidenceItem {
  id: string;
  source: string;
  event: string;
  timestamp: string;
  reliability: 'HIGH' | 'MEDIUM' | 'LOW';
  supports: string;
  contradicts?: string;
  hasConflict: boolean;
  conflictDetails?: string;
  isUnavailable?: boolean;
  verifiedHash: string;
  rawPayload: Record<string, string | number | boolean>;
}

export interface AgentNode {
  id: string;
  name: string;
  role: string;
  task: string;
  status: 'idle' | 'processing' | 'completed' | 'warning' | 'conflict';
  evidenceProcessed: number;
  confidence: number;
  output: string;
  objective: string;
  runtimeMs: number;
}

export interface Hypothesis {
  id: string;
  title: string;
  type: 'primary' | 'counter' | 'alternative';
  likelihood: number;
  description: string;
  supportingEvidenceIds: string[];
  refutingEvidenceIds: string[];
}

export interface ResponseAction {
  id: string;
  name: string;
  actionKey: string;
  description: string;
  type: 'identity' | 'network' | 'endpoint' | 'preservation' | 'escalation' | 'monitoring';
  riskLevel: 'Low' | 'Moderate' | 'High';
  blastRadius: string;
  requiresApproval: boolean;
  approved: boolean;
  executed: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

export interface InvestigationCase {
  id: string;
  alertId: string;
  title: string;
  alertType: string;
  user: string;
  userRole: string;
  department: string;
  device: string;
  deviceType: string;
  os: string;
  source: string;
  severity: Severity;
  status: AlertStatus;
  startedAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
  evidence: EvidenceItem[];
  hypotheses: Hypothesis[];
  actions: ResponseAction[];
  assessment: {
    verdict: string;
    overallConfidence: ConfidenceLevel;
    evidenceQuality: 'HIGH' | 'MEDIUM' | 'LOW';
    attackConfidence: 'HIGH' | 'MEDIUM' | 'LOW';
    dataCompleteness: 'COMPLETE' | 'PARTIAL' | 'DEFICIENT';
    contradictionDetected: boolean;
    contradictionSummary?: string;
    missingSources: string[];
    analystSummary: string;
  };
}

export interface AgentActivityLog {
  id: string;
  timestamp: string;
  agent: string;
  action: string;
  details: string;
  status: 'Processing' | 'Completed' | 'Warning' | 'Evidence Conflict';
  caseId: string;
}
