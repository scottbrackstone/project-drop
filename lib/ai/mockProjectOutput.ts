import { formatCodingAgentHandoffOutput } from '@/lib/ai/outputModes/codingAgentHandoff';
import { formatDecisionsLogOutput } from '@/lib/ai/outputModes/decisionsLog';
import { formatMeetingUpdateOutput } from '@/lib/ai/outputModes/meetingUpdate';
import { formatNextActionsOutput } from '@/lib/ai/outputModes/nextActions';
import { formatOpenLoopsOutput } from '@/lib/ai/outputModes/openLoops';
import { formatReportOutput } from '@/lib/ai/outputModes/report';
import { formatSnapshotOutput } from '@/lib/ai/outputModes/snapshot';
import type {
  GeneratedProjectOutput,
  ProjectContextBundle,
  ProjectOutputMode,
} from '@/types/projectOutput';

const MODE_FORMATTERS: Record<
  ProjectOutputMode,
  (context: ProjectContextBundle) => GeneratedProjectOutput
> = {
  snapshot: formatSnapshotOutput,
  next_actions: formatNextActionsOutput,
  open_loops: formatOpenLoopsOutput,
  decisions_log: formatDecisionsLogOutput,
  meeting_update: formatMeetingUpdateOutput,
  report: formatReportOutput,
  coding_agent_handoff: formatCodingAgentHandoffOutput,
};

export function mockGenerateProjectOutput(
  context: ProjectContextBundle,
  mode: ProjectOutputMode,
): GeneratedProjectOutput {
  const formatter = MODE_FORMATTERS[mode];
  return formatter(context);
}
