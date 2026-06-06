import type { Href } from 'expo-router';

export const ROUTES = {
  home: '/' as Href,
  projects: '/projects' as Href,
  projectsNew: '/projects/new' as Href,
  projectDetail: (projectId: string): Href => ({
    pathname: '/projects/[projectId]',
    params: { projectId },
  }),
  projectOutputs: (projectId: string): Href =>
    `/projects/${projectId}/outputs` as Href,
  projectSettings: (projectId: string): Href =>
    `/projects/${projectId}/settings` as Href,
  projectOutputSettings: (projectId: string): Href =>
    `/projects/${projectId}/settings/outputs` as Href,
  projectProjectSettings: (projectId: string): Href =>
    `/projects/${projectId}/settings/project` as Href,
} as const;
