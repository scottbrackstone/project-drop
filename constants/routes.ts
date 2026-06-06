import type { Href } from 'expo-router';

export const ROUTES = {
  home: '/' as Href,
  projects: '/projects' as Href,
  projectsNew: '/projects/new' as Href,
  projectDetail: (projectId: string): Href => ({
    pathname: '/projects/[projectId]',
    params: { projectId },
  }),
} as const;
