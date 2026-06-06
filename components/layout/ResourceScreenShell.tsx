import type { ReactNode } from 'react';

import { AppShell } from '@/components/layout/AppShell';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface ResourceScreenShellProps {
  title: string;
  showBack?: boolean;
  subtitle?: string;
  headerRight?: ReactNode;
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
  headerRight,
  loading,
  loadingLabel,
  error,
  notFound = false,
  notFoundTitle,
  notFoundDescription,
  children,
}: ResourceScreenShellProps) {
  const shellProps = { title, showBack, subtitle, headerRight };

  if (loading) {
    return (
      <AppShell {...shellProps}>
        <LoadingSpinner label={loadingLabel} />
      </AppShell>
    );
  }

  if (error || notFound) {
    return (
      <AppShell {...shellProps}>
        <EmptyState title={notFoundTitle} description={error ?? notFoundDescription} />
      </AppShell>
    );
  }

  return <AppShell {...shellProps}>{children}</AppShell>;
}
