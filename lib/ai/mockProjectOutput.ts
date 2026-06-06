import { formatDecisionsLogOutput } from '@/lib/ai/outputModes/decisionsLog';
import { formatMeetingUpdateOutput } from '@/lib/ai/outputModes/meetingUpdate';
import { formatNextActionsOutput } from '@/lib/ai/outputModes/nextActions';
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
  decisions_log: formatDecisionsLogOutput,
  meeting_update: formatMeetingUpdateOutput,
};

export function mockGenerateProjectOutput(
  context: ProjectContextBundle,
  mode: ProjectOutputMode,
): GeneratedProjectOutput {
  const formatter = MODE_FORMATTERS[mode];
  return formatter(context);
}
