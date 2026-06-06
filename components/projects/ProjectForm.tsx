import { useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { COPY } from '@/constants/copy';
import { getErrorMessage } from '@/lib/utils/errors';
import type { ProjectFormValues } from '@/types/project';

interface ProjectFormProps {
  onSubmit: (values: ProjectFormValues) => Promise<void>;
}

export function ProjectForm({ onSubmit }: ProjectFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError(null);
    setLoading(true);

    try {
      await onSubmit({ name, description });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="gap-4">
      <Input
        label={COPY.projectForm.nameLabel}
        value={name}
        onChangeText={setName}
        placeholder={COPY.projectForm.namePlaceholder}
        autoFocus
      />
      <Textarea
        label={COPY.projectForm.descriptionLabel}
        value={description}
        onChangeText={setDescription}
        placeholder={COPY.projectForm.descriptionPlaceholder}
      />
      {error ? <Text className="text-sm text-red-600">{error}</Text> : null}
      <Button
        title={COPY.projectForm.submit}
        onPress={() => void handleSubmit()}
        loading={loading}
      />
    </View>
  );
}
