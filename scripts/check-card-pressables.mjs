import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();

const pressableCardPath = resolve(root, 'components/ui/PressableCard.tsx');
assert.ok(existsSync(pressableCardPath), 'PressableCard component should exist');

const pressableCardSource = readFileSync(pressableCardPath, 'utf8');
assert.match(
  pressableCardSource,
  /<Pressable\b/,
  'PressableCard should render a React Native Pressable',
);
assert.match(
  pressableCardSource,
  /active:bg-neutral-50/,
  'PressableCard should keep the active state on the Pressable itself',
);
assert.doesNotMatch(
  pressableCardSource,
  /<Card\b/,
  'PressableCard should not wrap a Card view inside the Pressable',
);

for (const componentPath of [
  'components/projects/ProjectCard.tsx',
  'components/home/ContinueProjectCard.tsx',
]) {
  const source = readFileSync(resolve(root, componentPath), 'utf8');
  assert.match(
    source,
    /PressableCard/,
    `${componentPath} should use PressableCard for tappable cards`,
  );
  assert.doesNotMatch(
    source,
    /active:bg-neutral-50/,
    `${componentPath} should not put active state on an inner card view`,
  );
}

const navigationSource = readFileSync(resolve(root, 'hooks/useProjectNavigation.ts'), 'utf8');
assert.doesNotMatch(
  navigationSource,
  /Alert\.alert/,
  'Project navigation should not show diagnostic alerts before routing',
);
