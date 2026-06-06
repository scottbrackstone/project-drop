import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { COPY } from '@/constants/copy';

interface OutputActionsProps {
  canDelete: boolean;
  generating: boolean;
  deleting: boolean;
  copied: boolean;
  actionError: string | null;
  onCopy: () => void;
  onShare: () => void;
  onRegenerate: () => void;
  onDelete: () => void;
}

export function OutputActions({
  canDelete,
  generating,
  deleting,
  copied,
  actionError,
  onCopy,
  onShare,
  onRegenerate,
  onDelete,
}: OutputActionsProps) {
  return (
    <View className="gap-2">
      <View className="flex-row flex-wrap gap-2">
        <View className="min-w-[30%] flex-1">
          <Button
            title={copied ? COPY.outputs.actions.copied : COPY.outputs.actions.copy}
            variant="secondary"
            size="sm"
            onPress={onCopy}
            disabled={generating || deleting}
          />
        </View>
        <View className="min-w-[30%] flex-1">
          <Button
            title={COPY.outputs.actions.share}
            variant="secondary"
            size="sm"
            onPress={onShare}
            disabled={generating || deleting}
          />
        </View>
        <View className="min-w-[30%] flex-1">
          <Button
            title={COPY.outputs.actions.regenerate}
            variant="secondary"
            size="sm"
            onPress={onRegenerate}
            loading={generating}
            disabled={generating || deleting}
          />
        </View>
        {canDelete ? (
          <View className="min-w-[30%] flex-1">
            <Button
              title={COPY.outputs.actions.delete}
              variant="ghost"
              size="sm"
              onPress={onDelete}
              loading={deleting}
              disabled={generating || deleting}
              className="border border-red-200 bg-red-50"
            />
          </View>
        ) : null}
      </View>
      {actionError ? <Text className="text-sm text-red-600">{actionError}</Text> : null}
    </View>
  );
}
