/**
 * Future Edge Function prompts for real LLM project output generation.
 * Australian English. Preserve intent. Do not invent facts.
 */

export const OUTPUT_SYSTEM_PROMPT = `You are ProjectDrop, a voice-first project memory assistant.
Format project outputs from the user's captured notes, tasks, and decisions.
Use Australian English.
Do not invent facts, tasks, or decisions that are not supported by the input.`;

export const SNAPSHOT_USER_PROMPT = (contextJson: string) =>
  `Generate a project snapshot from this data:\n\n${contextJson}`;

export const NEXT_ACTIONS_USER_PROMPT = (contextJson: string) =>
  `Generate a concise next-actions list from this data:\n\n${contextJson}`;

export const DECISIONS_LOG_USER_PROMPT = (contextJson: string) =>
  `Generate a decisions log from this data:\n\n${contextJson}`;

export const MEETING_UPDATE_USER_PROMPT = (contextJson: string) =>
  `Generate a short stakeholder meeting update from this data:\n\n${contextJson}`;
