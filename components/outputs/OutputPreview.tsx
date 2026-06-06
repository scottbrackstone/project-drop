import { Text, View } from 'react-native';

import { OutputActions } from '@/components/outputs/OutputActions';
import { Badge } from '@/components/ui/Badge';
import { SectionCard } from '@/components/ui/SectionCard';
import { COPY, getOutputModeLabel, getOutputScopeLabel } from '@/constants/copy';
import { formatDateTime } from '@/lib/utils/dates';
import type { ProjectOutputMode, ProjectOutputScope } from '@/types/projectOutput';

export interface OutputDisplayItem {
  id?: string;
  title: string;
  content: string;
  mode?: ProjectOutputMode;
  scope?: ProjectOutputScope;
  createdAt?: string;
}

interface OutputPreviewProps {
  output: OutputDisplayItem | null;
  generating: boolean;
  deleting: boolean;
  copied: boolean;
  actionError: string | null;
  onCopy: () => void;
  onShare: () => void;
  onRegenerate: () => void;
  onDelete: () => void;
}

export function OutputPreview({
  output,
  generating,
  deleting,
  copied,
  actionError,
  onCopy,
  onShare,
  onRegenerate,
  onDelete,
}: OutputPreviewProps) {
  if (!output && !generating) {
    return null;
  }

  return (
    <SectionCard title={COPY.outputs.previewTitle}>
      {generating && !output ? (
        <Text className="text-base text-neutral-600">{COPY.outputs.generating}</Text>
      ) : null}
      {output ? (
        <View className="gap-3">
          <Text className="text-base font-semibold text-neutral-900">{output.title}</Text>
          {output.mode || output.scope || output.createdAt ? (
            <View className="flex-row flex-wrap gap-2">
              {output.mode ? <Badge label={getOutputModeLabel(output.mode)} /> : null}
              {output.scope ? <Badge label={getOutputScopeLabel(output.scope)} tone="success" /> : null}
              {output.createdAt ? (
                <Text className="self-center text-xs text-neutral-500">
                  {formatDateTime(output.createdAt)}
                </Text>
              ) : null}
            </View>
          ) : null}
          <Text className="text-base leading-6 text-neutral-800">{output.content}</Text>
          <OutputActions
            canDelete={Boolean(output.id)}
            generating={generating}
            deleting={deleting}
            copied={copied}
            actionError={actionError}
            onCopy={onCopy}
            onShare={onShare}
            onRegenerate={onRegenerate}
            onDelete={onDelete}
          />
        </View>
      ) : null}
    </SectionCard>
  );
}
