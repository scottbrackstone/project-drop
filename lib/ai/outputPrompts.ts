/**
 * Project output prompt guidance — mirrored server-side in
 * supabase/functions/generate-project-output/prompts.ts for DeepSeek.
 * Australian English. Preserve intent. Do not invent facts.
 */

export const OUTPUT_SYSTEM_PROMPT = `You are ProjectDrop, a voice-first project memory assistant.
Format project outputs from the user's captured notes, tasks, and decisions.
Use Australian English.
Combine information across all provided notes.
Use only facts supported by the provided project context.
Do not invent tasks, decisions, dates, filenames, commit hashes, or stakeholders.
If context is thin, say so clearly.`;

const CONTEXT_RULES = `Use only the provided project context.
Do not invent facts, files, commits, or stakeholders.
Preserve tasks and decisions from context.
If context is thin or missing detail, say so clearly.`;

export const SNAPSHOT_MODE_GUIDANCE = `${CONTEXT_RULES}
Summarise the project, combine relevant notes, show current state, list decisions and open tasks from context, identify risks/questions visible in context, and suggest next actions based only on provided data.`;

export const NEXT_ACTIONS_MODE_GUIDANCE = `${CONTEXT_RULES}
Prioritise open tasks, group related work, identify blockers, suggest next steps from context only — do not invent tasks.`;

export const OPEN_LOOPS_MODE_GUIDANCE = `${CONTEXT_RULES}
List unresolved items from context only: things to confirm, unanswered questions, risks, unfinished decisions, missing information, follow-ups, blockers, and unclear next steps.
Do not invent open loops.`;

export const DECISIONS_LOG_MODE_GUIDANCE = `${CONTEXT_RULES}
List decisions from context with reasoning when available. Do not invent decisions. State clearly if none exist.`;

export const MEETING_UPDATE_MODE_GUIDANCE = `${CONTEXT_RULES}
Write a stakeholder-friendly update covering what changed, decisions made, blockers, and next steps.`;

export const REPORT_MODE_GUIDANCE = `${CONTEXT_RULES}
Write a formal report with sections: Background, Timeline, Findings, Tasks, Decisions, Outstanding items, Recommendations.
Mark gaps clearly when context is missing.`;

export const CODING_AGENT_HANDOFF_MODE_GUIDANCE = `${CONTEXT_RULES}
Write a copy/paste-ready handoff for a coding agent (Codex, OpenClaw, etc.) with sections:
Project context, Current status, What works, Files/areas changed, Known issues, Current next task, Rules to follow, Do not change, Manual test plan, Recent commits/details.
Do not invent filenames, commit hashes, or file paths. If not in context, explicitly say they are not provided.`;

export const SNAPSHOT_USER_PROMPT = (contextJson: string) =>
  `${SNAPSHOT_MODE_GUIDANCE}\n\nProject context:\n${contextJson}`;

export const NEXT_ACTIONS_USER_PROMPT = (contextJson: string) =>
  `${NEXT_ACTIONS_MODE_GUIDANCE}\n\nProject context:\n${contextJson}`;

export const OPEN_LOOPS_USER_PROMPT = (contextJson: string) =>
  `${OPEN_LOOPS_MODE_GUIDANCE}\n\nProject context:\n${contextJson}`;

export const DECISIONS_LOG_USER_PROMPT = (contextJson: string) =>
  `${DECISIONS_LOG_MODE_GUIDANCE}\n\nProject context:\n${contextJson}`;

export const MEETING_UPDATE_USER_PROMPT = (contextJson: string) =>
  `${MEETING_UPDATE_MODE_GUIDANCE}\n\nProject context:\n${contextJson}`;

export const REPORT_USER_PROMPT = (contextJson: string) =>
  `${REPORT_MODE_GUIDANCE}\n\nProject context:\n${contextJson}`;

export const CODING_AGENT_HANDOFF_USER_PROMPT = (contextJson: string) =>
  `${CODING_AGENT_HANDOFF_MODE_GUIDANCE}\n\nProject context:\n${contextJson}`;
