/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { DashboardOverview } from './components/DashboardOverview';
import { AlertsInbox } from './components/AlertsInbox';
import { InvestigationWorkspace } from './components/InvestigationWorkspace';
import { AgentPipelineView } from './components/AgentPipelineView';
import { EvidenceLedger } from './components/EvidenceLedger';
import { ContradictionShowcase } from './components/ContradictionShowcase';
import { AiReasoningStream } from './components/AiReasoningStream';
import { ResponseCenter } from './components/ResponseCenter';
import { AnalyticsView } from './components/AnalyticsView';
import { ReportsView } from './components/ReportsView';
import { EvidenceModal, ApprovalModal } from './components/Modals';
import { SimulationController } from './components/SimulationController';

import { 
  INITIAL_AGENTS, 
  INITIAL_ALERTS, 
  PRIMARY_CASE, 
  INITIAL_ACTIVITY_LOGS 
} from './data/mockSocData';
import { Alert, EvidenceItem, ResponseAction, AgentActivityLog, InvestigationCase } from './types/soc';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('landing');
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [activeCase, setActiveCase] = useState<InvestigationCase>(PRIMARY_CASE);
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [logs, setLogs] = useState<AgentActivityLog[]>(INITIAL_ACTIVITY_LOGS);

  // Modals state
  const [inspectingEvidence, setInspectingEvidence] = useState<EvidenceItem | null>(null);
  const [approvingAction, setApprovingAction] = useState<ResponseAction | null>(null);
  const [isSimulationOpen, setIsSimulationOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handler: Select an alert from the table
  const handleSelectAlert = (alert: Alert) => {
    if (alert.id === 'ALT-9821') {
      setActiveCase(PRIMARY_CASE);
    } else {
      // Dynamically instantiate case from selected alert
      const dynamicCase: InvestigationCase = {
        ...PRIMARY_CASE,
        id: `SEC-${alert.id.replace('ALT-', '8')}`,
        alertId: alert.id,
        title: `Investigating ${alert.type} Incident (${alert.user})`,
        alertType: alert.type,
        user: alert.user,
        device: alert.device,
        source: alert.source,
        severity: alert.severity,
        status: alert.status,
        assessment: {
          ...PRIMARY_CASE.assessment,
          verdict: `${alert.type} - Cross-correlation analysis in progress.`,
          contradictionDetected: alert.type === 'IMPOSSIBLE TRAVEL',
        }
      };
      setActiveCase(dynamicCase);
    }
    setActiveTab('workspace');
    showToast(`Loaded ${alert.id} into Investigation Workspace`);
  };

  // Handler: Human approves an action in the modal
  const handleConfirmApproval = (actionId: string, notes: string) => {
    setActiveCase(prev => {
      const updatedActions = prev.actions.map(act => {
        if (act.id === actionId) {
          return {
            ...act,
            approved: true,
            approvedBy: 'L. Barde (Tier-2 SOC Analyst)',
            approvedAt: new Date().toLocaleTimeString(),
          };
        }
        return act;
      });
      return { ...prev, actions: updatedActions };
    });

    // Add audit log
    const targetAction = activeCase.actions.find(a => a.id === actionId);
    const newLog: AgentActivityLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString() + ' UTC',
      agent: 'Response Agent',
      action: `Human Authorized Action: ${targetAction?.name}`,
      details: `Analyst signed off with note: "${notes || 'No comments provided.'}". Action unlocked for execution.`,
      status: 'Completed',
      caseId: activeCase.id,
    };
    setLogs(prev => [newLog, ...prev]);

    setApprovingAction(null);
    showToast(`Action ${targetAction?.name} approved by analyst`);
  };

  // Handler: Execute an approved action
  const handleExecuteAction = (actionId: string) => {
    setActiveCase(prev => {
      const updatedActions = prev.actions.map(act => {
        if (act.id === actionId) {
          return { ...act, executed: true };
        }
        return act;
      });
      return { ...prev, actions: updatedActions };
    });

    const targetAction = activeCase.actions.find(a => a.id === actionId);
    const newLog: AgentActivityLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString() + ' UTC',
      agent: 'Response Agent',
      action: `Remediation Executed: ${targetAction?.name}`,
      details: `Zero-blast radius containment triggered. Live telemetry confirms successful execution.`,
      status: 'Completed',
      caseId: activeCase.id,
    };
    setLogs(prev => [newLog, ...prev]);
    showToast(`Executed: ${targetAction?.name}`);
  };

  const pendingActionsCount = activeCase.actions.filter(a => !a.executed).length;

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLaunchSimulation={() => setIsSimulationOpen(true)}
        isSimulating={isSimulationOpen}
        activeCaseId={activeCase.id}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 pb-12">
        {activeTab === 'landing' && (
          <LandingHero
            onLaunchInvestigation={() => setActiveTab('workspace')}
            onRunSimulation={() => setIsSimulationOpen(true)}
            agents={agents}
          />
        )}

        {activeTab === 'overview' && (
          <DashboardOverview
            onNavigate={(tab) => setActiveTab(tab)}
            alerts={alerts}
            agents={agents}
            activeCase={activeCase}
            pendingActionsCount={pendingActionsCount}
          />
        )}

        {activeTab === 'workspace' && (
          <InvestigationWorkspace
            caseData={activeCase}
            onOpenEvidence={(ev) => setInspectingEvidence(ev)}
            onRequestApproval={(action) => setApprovingAction(action)}
            onExecuteAction={handleExecuteAction}
            onNavigateToContradictions={() => setActiveTab('contradictions')}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertsInbox
            alerts={alerts}
            onSelectAlert={handleSelectAlert}
            selectedAlertId={activeCase.alertId}
          />
        )}

        {activeTab === 'agents' && (
          <AgentPipelineView
            agents={agents}
            caseData={activeCase}
            onOpenWorkspace={() => setActiveTab('workspace')}
          />
        )}

        {activeTab === 'evidence' && (
          <EvidenceLedger
            evidenceList={activeCase.evidence}
            onInspectEvidence={(ev) => setInspectingEvidence(ev)}
          />
        )}

        {activeTab === 'contradictions' && (
          <ContradictionShowcase
            caseData={activeCase}
            onOpenWorkspace={() => setActiveTab('workspace')}
            onRequestApproval={(action) => setApprovingAction(action)}
          />
        )}

        {activeTab === 'reasoning' && (
          <AiReasoningStream
            logs={logs}
            onOpenWorkspace={() => setActiveTab('workspace')}
          />
        )}

        {activeTab === 'response' && (
          <ResponseCenter
            caseData={activeCase}
            onRequestApproval={(action) => setApprovingAction(action)}
            onExecuteAction={handleExecuteAction}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            alerts={alerts}
            agents={agents}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsView
            caseData={activeCase}
          />
        )}
      </main>

      {/* Modals */}
      <EvidenceModal
        evidence={inspectingEvidence}
        onClose={() => setInspectingEvidence(null)}
      />

      <ApprovalModal
        action={approvingAction}
        onConfirm={handleConfirmApproval}
        onCancel={() => setApprovingAction(null)}
      />

      <SimulationController
        isOpen={isSimulationOpen}
        onClose={() => setIsSimulationOpen(false)}
        onFinishAndOpenWorkspace={() => {
          setIsSimulationOpen(false);
          setActiveTab('workspace');
          showToast('Simulation complete: Elena Vance case ready for analyst review.');
        }}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-200">
          <div className="px-4 py-2.5 rounded-xl bg-[#0d172e] border border-cyan-500/40 text-cyan-200 text-xs font-mono shadow-2xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

    </div>
  );
}
