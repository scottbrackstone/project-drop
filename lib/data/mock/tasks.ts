import { AppError } from '@/lib/utils/errors';
import { generateId } from '@/lib/utils/id';
import type { Task } from '@/types/task';

const tasks = new Map<string, Task>();

export function mockListOpenTasksByProject(projectId: string): Task[] {
  return Array.from(tasks.values())
    .filter((task) => task.projectId === projectId && task.status === 'open')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function mockInsertTasks(
  projectId: string,
  noteId: string,
  items: { title: string; dueDate: string | null }[],
): Task[] {
  const now = new Date().toISOString();
  const created: Task[] = [];

  for (const item of items) {
    const task: Task = {
      id: generateId(),
      projectId,
      noteId,
      title: item.title,
      status: 'open',
      dueDate: item.dueDate,
      createdAt: now,
      updatedAt: now,
    };
    tasks.set(task.id, task);
    created.push(task);
  }

  return created;
}

export function mockCompleteTask(taskId: string): Task {
  const task = tasks.get(taskId);
  if (!task) {
    throw new AppError('Task not found.');
  }

  const updated: Task = {
    ...task,
    status: 'done',
    updatedAt: new Date().toISOString(),
  };
  tasks.set(taskId, updated);
  return updated;
}

export function mockClearNoteIdFromTasks(noteId: string): void {
  for (const task of tasks.values()) {
    if (task.noteId === noteId) {
      tasks.set(task.id, { ...task, noteId: null });
    }
  }
}

export function mockPurgeTasksByProject(projectId: string): void {
  for (const [id, task] of tasks.entries()) {
    if (task.projectId === projectId) {
      tasks.delete(id);
    }
  }
}
