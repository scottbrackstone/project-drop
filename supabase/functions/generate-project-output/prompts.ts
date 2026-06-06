export type OutputModeName =
  | 'snapshot'
  | 'next_actions'
  | 'open_loops'
  | 'decisions_log'
  | 'meeting_update'
  | 'report'
  | 'coding_agent_handoff';

export const OUTPUT_SYSTEM_PROMPT = `You are ProjectDrop, a voice-first project memory assistant.
Format project outputs from the user's captured notes, tasks, and decisions.
Use Australian English.
Combine information across all provided notes into a coherent output.
Use only facts supported by the provided project context.
Do not invent tasks, decisions, dates, filenames, commit hashes, or stakeholders.
If context is thin, say so clearly.
Respond with valid JSON only: { "title": string, "content": string }.
The content field should be plain text with line breaks, not markdown.`;

const CONTEXT_RULES = `Use only the provided project context.
Do not invent facts, files, commits, or stakeholders.
Preserve tasks and decisions from context.
If context is thin or missing detail, say so clearly.`;

const MODE_INSTRUCTIONS: Record<OutputModeName, string> = {
  snapshot: `${CONTEXT_RULES}
Generate a Project Snapshot that:
- Summarises the project and combines relevant notes
- Shows current state
- Lists important decisions from the context
- Lists open tasks from the context
- Identifies risks or open questions visible in the context only
- Suggests next actions based only on the provided context`,

  next_actions: `${CONTEXT_RULES}
Generate a Next Actions output that:
- Prioritises open tasks from the context
- Groups related work when sensible
- Identifies blockers mentioned in notes or tasks
- Suggests sensible next steps from project context only
- Does not invent tasks that are not implied by the context`,

  open_loops: `${CONTEXT_RULES}
Generate an Open Loops output that lists unresolved items from context only:
- Things to confirm
- Unanswered questions
- Risks
- Unfinished decisions
- Missing information
- Follow-ups
- Blockers
- Unclear next steps
Do not invent open loops.`,

  decisions_log: `${CONTEXT_RULES}
Generate a Decisions Log that:
- Lists decisions already made in the provided context
- Includes reasoning when available
- Does not invent decisions
- Clearly states if no decisions exist in the context`,

  meeting_update: `${CONTEXT_RULES}
Generate a stakeholder-friendly Meeting Update that covers:
- What changed in the scoped period
- Decisions made
- Current blockers
- Next steps
Keep the tone practical and concise.`,

  report: `${CONTEXT_RULES}
Generate a formal Report with sections:
- Background
- Timeline
- Findings
- Tasks
- Decisions
- Outstanding items
- Recommendations
Mark gaps clearly when context is missing.`,

  coding_agent_handoff: `${CONTEXT_RULES}
Generate a Coding Agent Handoff document suitable for copy/paste into Codex, OpenClaw, or another coding agent.
Include sections: Project context, Current status, What works, Files/areas changed, Known issues, Current next task, Rules to follow, Do not change, Manual test plan, Recent commits/details.
Do not invent filenames, commit hashes, or file paths. If not in context, explicitly state they are not provided.
Write in plain text suitable for copy/paste.`,
};

export function buildUserPrompt(mode: OutputModeName, contextJson: string): string {
  const instructions = MODE_INSTRUCTIONS[mode];
  return `${instructions}\n\nProject context JSON:\n${contextJson}`;
}

export function isValidOutputMode(value: string): value is OutputModeName {
  return (
    value === 'snapshot' ||
    value === 'next_actions' ||
    value === 'open_loops' ||
    value === 'decisions_log' ||
    value === 'meeting_update' ||
    value === 'report' ||
    value === 'coding_agent_handoff'
  );
}
