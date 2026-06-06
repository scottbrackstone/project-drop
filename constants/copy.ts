export const COPY = {
  tagline: 'Voice notes that organise themselves into projects.',
  home: {
    headline: 'Capture quickly. Organise automatically. Retrieve later.',
    body:
      'Record a quick voice note and ProjectDrop transcribes it, extracts tasks and decisions, and saves everything to the right project folder.',
    viewProjects: 'View projects',
    createProject: 'Create project',
    dataModeMock: 'Local mock (no Supabase)',
    dataModeSupabase: 'Supabase',
  },
  projects: {
    title: 'Projects',
    subtitle: 'Your project folders',
    createProject: 'Create project',
    emptyTitle: 'No projects yet',
    emptyDescription:
      'Create a project to start capturing voice notes that organise themselves.',
    loadErrorTitle: 'Could not load projects',
    loading: 'Loading projects…',
  },
  projectNew: {
    title: 'New project',
    subtitle: 'Keep it simple — name it and go',
  },
  projectDetail: {
    loadingTitle: 'Project',
    loadingLabel: 'Loading project…',
    notFoundTitle: 'Project not found',
    notFoundDescription: 'This project may have been removed.',
    captureTitle: 'Add note',
    captureDescription: 'Type or paste a quick note. ProjectDrop will organise it for you.',
    captureButton: 'Save to project',
    capturePlaceholder: 'Type or paste your note…',
    captureProcessing: 'Processing note…',
    tasksTitle: 'Open tasks',
    tasksEmpty: 'No open tasks yet.',
    notesTitle: 'Notes',
    notesEmpty: 'No notes yet. Add one above.',
    notesLoading: 'Loading notes…',
    tasksLoading: 'Loading tasks…',
    projectOutputsButton: 'Project outputs',
    completeTask: 'Done',
    deleteNote: 'Delete',
    textDivider: 'Or type a note',
  },
  settings: {
    title: 'Project settings',
    subtitle: 'Output preferences and project maintenance.',
    settingsButton: 'Settings',
    menuOutputSettings: 'Output settings',
    menuOutputSettingsDescription: 'Choose which output modes appear when generating.',
    menuProjectSettings: 'Project settings',
    menuProjectSettingsDescription: 'Project details and delete project.',
    outputSettingsTitle: 'Output settings',
    outputSettingsDescription:
      'Disabled modes are hidden from the generator. Saved output history is unchanged.',
    projectSettingsTitle: 'Project settings',
    projectSummaryTitle: 'Project summary',
    lastModeWarning: 'At least one output mode must stay enabled.',
  },
  deleteNote: {
    title: 'Delete note?',
    message: 'This note will be removed from the project timeline.',
    confirm: 'Delete',
  },
  deleteProject: {
    title: 'Delete project?',
    message: (projectName: string) =>
      `Delete "${projectName}"? This permanently removes all notes, tasks, decisions, tags, and outputs. This cannot be undone.`,
    sectionDescription:
      'Permanently removes this project and all notes, tasks, decisions, tags, and saved outputs.',
    confirm: 'Delete project',
    sectionTitle: 'Danger zone',
    button: 'Delete project',
  },
  common: {
    cancel: 'Cancel',
  },
  outputs: {
    title: 'Project outputs',
    subtitle: 'Generate formatted views from your project memory',
    generatorTitle: 'Generate output',
    modeLabel: 'Output mode',
    scopeLabel: 'Scope',
    generateButton: 'Generate output',
    generating: 'Generating output…',
    previewTitle: 'Preview',
    historyTitle: 'Recent outputs',
    historyEmpty: 'No outputs yet. Generate one above.',
    historyLoading: 'Loading outputs…',
    scopeFallbackHint: 'No previous output — using full project.',
    loadErrorTitle: 'Could not load project',
    modes: {
      snapshot: 'Project snapshot',
      next_actions: 'Next actions',
      open_loops: 'Open loops',
      decisions_log: 'Decisions log',
      meeting_update: 'Meeting update',
      report: 'Report',
      coding_agent_handoff: 'Coding agent handoff',
    },
    modeDescriptions: {
      snapshot: 'Overview of notes, tasks, and decisions.',
      next_actions: 'Prioritised tasks and suggested next steps.',
      open_loops: 'Unresolved questions, risks, follow-ups, and blockers.',
      decisions_log: 'Decisions made with reasoning when available.',
      meeting_update: 'Stakeholder-friendly summary of recent progress.',
      report: 'Formal background, findings, tasks, and recommendations.',
      coding_agent_handoff: 'Copy/paste handoff for Codex or another coding agent.',
    },
    scopes: {
      full: 'Full project',
      since_last_output: 'Since last output',
      today: 'Today',
      last_7_days: 'Last 7 days',
    },
  },
  voice: {
    title: 'Voice note',
    description:
      'Record on your device, transcribe when ready, then save the transcript to your project.',
    startRecording: 'Start recording',
    stopRecording: 'Stop recording',
    discardRecording: 'Discard',
    playRecording: 'Play',
    pausePlayback: 'Pause',
    savedRecording: 'Recording saved on device',
    recording: 'Recording…',
    ready: 'Ready',
    recordedStatus: 'Recorded',
    permissionDenied:
      'Microphone access denied. Enable it in your device settings to record voice notes.',
    transcriptLabel: 'Transcript for this recording',
    transcriptPlaceholder: 'Type what you said…',
    sourceBadge: 'Voice',
    useMockTranscript: 'Use mock transcript',
    transcribeRecording: 'Transcribe recording',
    transcribingMock: 'Generating mock transcript…',
    transcribingRemote: 'Transcribing…',
    mockTranscriptWarning:
      'This is mock transcription text for testing. Edit it before saving.',
    mockTranscriptDisabledHint:
      'Clear the transcript field first if you want to use mock transcription.',
  },
  projectForm: {
    nameLabel: 'Project name',
    namePlaceholder: 'e.g. Website redesign',
    descriptionLabel: 'Description (optional)',
    descriptionPlaceholder: 'What is this project about?',
    submit: 'Create project',
  },
  layout: {
    back: 'Back',
  },
  notFound: {
    title: 'Screen not found',
    description: 'This screen does not exist.',
    goHome: 'Go to home',
  },
} as const;

export function formatDataModeLabel(provider: 'mock' | 'supabase'): string {
  return provider === 'mock' ? COPY.home.dataModeMock : COPY.home.dataModeSupabase;
}

export function formatPlaybackTime(current: string): string {
  return `Playback: ${current}`;
}

export function getOutputModeLabel(mode: keyof typeof COPY.outputs.modes): string {
  return COPY.outputs.modes[mode];
}

export function getOutputModeDescription(mode: keyof typeof COPY.outputs.modeDescriptions): string {
  return COPY.outputs.modeDescriptions[mode];
}

export function getOutputScopeLabel(scope: keyof typeof COPY.outputs.scopes): string {
  return COPY.outputs.scopes[scope];
}

export function getScopeFallbackHint(): string {
  return COPY.outputs.scopeFallbackHint;
}
