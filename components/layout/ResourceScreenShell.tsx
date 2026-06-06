import type { ReactNode } from 'react';

import { AppShell } from '@/components/layout/AppShell';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface ResourceScreenShellProps {
  title: string;
  showBack?: boolean;
  subtitle?: string;
  loading: boolean;
  loadingLabel: string;
  error: string | null;
  notFound?: boolean;
  notFoundTitle: string;
  notFoundDescription: string;
  children: ReactNode;
}

export function ResourceScreenShell({
  title,
  showBack = true,
  subtitle,
  loading,
  loadingLabel,
  error,
  notFound = false,
  notFoundTitle,
  notFoundDescription,
  children,
}: ResourceScreenShellProps) {
  if (loading) {
    return (
      <AppShell title={title} showBack={showBack} subtitle={subtitle}>
        <LoadingSpinner label={loadingLabel} />
      </AppShell>
    );
  }

  if (error || notFound) {
    return (
      <AppShell title={title} showBack={showBack} subtitle={subtitle}>
        <EmptyState
          title={notFoundTitle}
          description={error ?? notFoundDescription}
        />
      </AppShell>
    );
  }

  return (
    <AppShell title={title} showBack={showBack} subtitle={subtitle}>
      {children}
    </AppShell>
  );
}
