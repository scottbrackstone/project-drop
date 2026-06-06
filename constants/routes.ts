export const ROUTES = {
  home: '/',
  projects: '/projects',
  projectsNew: '/projects/new',
  projectDetail: (projectId: string) => `/projects/${projectId}`,
  projectReport: (projectId: string) => `/projects/${projectId}/report`,
} as const;
