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

// Response schema for successful operations
export const SuccessResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
});

// Response schema for error operations
export const ErrorResponseSchema = z.object({
  success: z.boolean(),
  error: z.string(),
});

// Export types
export type TodoistTask = z.infer<typeof TodoistTaskSchema>;
export type AddTaskInput = z.infer<typeof AddTaskSchema>;
export type GetTaskInput = z.infer<typeof GetTaskSchema>;
export type CloseTaskInput = z.infer<typeof CloseTaskSchema>;
export type ReopenTaskInput = z.infer<typeof ReopenTaskSchema>;
export type DeleteTaskInput = z.infer<typeof DeleteTaskSchema>;
export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

