import { z } from 'zod';

// Base schema for Task
export const TodoistTaskSchema = z.object({
  id: z.string(),
  content: z.string(),
  description: z.string().optional(),
  due: z.object({
    date: z.string().optional(),
    string: z.string().optional(),
    recurring: z.boolean().optional(),
  }).optional(),
  priority: z.number().min(1).max(4).optional(),
  project_id: z.string().optional(),
  completed: z.boolean().optional(),
  created_at: z.string(),
  updated_at: z.string().optional(),
});

// Input schema for adding a task
export const AddTaskSchema = z.object({
  content: z.string().min(1, "Content is required"),
  description: z.string().optional(),
  due_string: z.string().optional(),
  priority: z.number().min(1).max(4).optional(),
  project_id: z.string().optional(),
});

// Input schema for retrieving a task
export const GetTaskSchema = z.object({
  task_id: z.string().min(1, "Task ID is required"),
});

// Schema for listing and filtering tasks
export const ListTasksSchema = z.object({
  project_id: z.string().optional(),
  label_id: z.string().optional(),
  section_id: z.string().optional(),
  completed: z.boolean().optional(),
  due_before: z.string().optional(),
  due_after: z.string().optional(),
  due_today: z.boolean().optional(),
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
  sort: z.enum(['date', 'priority', 'content']).optional(),
  sort_direction: z.enum(['asc', 'desc']).optional(),
});

// Input schema for closing a task
export const CloseTaskSchema = z.object({
  task_id: z.string().min(1, "Task ID is required"),
});

// Input schema for reopening a task
export const ReopenTaskSchema = z.object({
  task_id: z.string().min(1, "Task ID is required"),
});

// Input schema for deleting a task
export const DeleteTaskSchema = z.object({
  task_id: z.string().min(1, "Task ID is required"),
});

export type TodoistTask = z.infer<typeof TodoistTaskSchema>;
export type AddTaskInput = z.infer<typeof AddTaskSchema>;
export type GetTaskInput = z.infer<typeof GetTaskSchema>;
export type ListTasksInput = z.infer<typeof ListTasksSchema>;
export type CloseTaskInput = z.infer<typeof CloseTaskSchema>;
export type ReopenTaskInput = z.infer<typeof ReopenTaskSchema>;
export type DeleteTaskInput = z.infer<typeof DeleteTaskSchema>;

