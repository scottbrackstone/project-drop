import { View } from 'react-native';

import { OutputCard } from '@/components/outputs/OutputCard';
import { CompactEmpty } from '@/components/ui/CompactEmpty';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { SectionCard } from '@/components/ui/SectionCard';
import { COPY } from '@/constants/copy';
import type { ProjectOutput } from '@/types/report';

interface OutputHistoryListProps {
  outputs: ProjectOutput[];
  loading: boolean;
  selectedId: string | null;
  onSelect: (output: ProjectOutput) => void;
}

export function OutputHistoryList({
  outputs,
  loading,
  selectedId: _selectedId,
  onSelect,
}: OutputHistoryListProps) {
  return (
    <SectionCard title={COPY.outputs.historyTitle}>
      {loading ? <LoadingSpinner label={COPY.outputs.historyLoading} /> : null}
      {!loading && outputs.length === 0 ? (
        <CompactEmpty message={COPY.outputs.historyEmpty} />
      ) : null}
      {!loading && outputs.length > 0 ? (
        <View>
          {outputs.map((output) => (
            <OutputCard key={output.id} output={output} onPress={onSelect} />
          ))}
        </View>
      ) : null}
    </SectionCard>
  );
}
