import { useCallback, useRef, useState } from 'react';

import { assembleProjectContext } from '@/lib/ai/assembleProjectContext';
import { generateProjectOutput } from '@/lib/ai/generateProjectOutput';
import { createProjectOutput } from '@/lib/data/reports';
import { getErrorMessage } from '@/lib/utils/errors';
import type { GeneratedProjectOutput, ProjectOutputMode, ProjectOutputScope } from '@/types/projectOutput';
import type { ProjectOutput } from '@/types/report';

interface UseGenerateProjectOutputOptions {
  onSaved?: (output: ProjectOutput) => void | Promise<void>;
}

interface UseGenerateProjectOutputResult {
  generate: (mode: ProjectOutputMode, scope: ProjectOutputScope) => Promise<ProjectOutput | null>;
  generating: boolean;
  preview: GeneratedProjectOutput | null;
  error: string | null;
  clearPreview: () => void;
}

export function useGenerateProjectOutput(
  projectId: string | undefined,
  options: UseGenerateProjectOutputOptions = {},
): UseGenerateProjectOutputResult {
  const [generating, setGenerating] = useState(false);
  const [preview, setPreview] = useState<GeneratedProjectOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const onSavedRef = useRef(options.onSaved);
  onSavedRef.current = options.onSaved;

  const generate = useCallback(
    async (mode: ProjectOutputMode, scope: ProjectOutputScope): Promise<ProjectOutput | null> => {
      if (!projectId) return null;

      setGenerating(true);
      setError(null);
      setPreview(null);

      try {
        const context = await assembleProjectContext(projectId, scope);
        const generated = await generateProjectOutput(context, mode);

        const saved = await createProjectOutput({
          projectId,
          title: generated.title,
          content: generated.content,
          mode: generated.mode,
          scope: generated.scope,
        });

        setPreview(generated);
        await onSavedRef.current?.(saved);
        return saved;
      } catch (err) {
        setError(getErrorMessage(err));
        return null;
      } finally {
        setGenerating(false);
      }
    },
    [projectId],
  );

  const clearPreview = useCallback(() => setPreview(null), []);

  return { generate, generating, preview, error, clearPreview };
}
