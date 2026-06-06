import { useRouter } from 'expo-router';

import { AppShell } from '@/components/layout/AppShell';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { useCreateProject } from '@/hooks/useCreateProject';
import type { ProjectFormValues } from '@/types/project';

export default function NewProjectScreen() {
  const router = useRouter();
  const { create } = useCreateProject();

  async function handleSubmit(values: ProjectFormValues) {
    const project = await create({
      name: values.name,
      description: values.description,
    });
    router.replace(ROUTES.projectDetail(project.id));
  }

  return (
    <AppShell title={COPY.projectNew.title} showBack subtitle={COPY.projectNew.subtitle}>
      <ProjectForm onSubmit={handleSubmit} />
    </AppShell>
  );
}
