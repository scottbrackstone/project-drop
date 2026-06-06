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
    summariseButton: 'Summarise project',
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
