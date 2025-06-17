import { z } from 'zod';

// Input schema for adding a task
export const AddTaskSchema = z.object({
  content: z.string().min(1, `Content is required`)
    .describe(
      `The task content (required).
       The text of the task.
       This value may contain markdown-formatted text and hyperlinks`
    ),

  description: z.string().optional()
    .describe(
      `A description for the task.
       This value may contain markdown-formatted text and hyperlinks.`
    ),

  //!TODO: add due and deadline fields

  priority: z.number().min(1).max(4).optional()
    .describe(
      `Task priority from 1 (normal) to 4 (very urgent)`
    ),

  project_id: z.string().optional()
    .describe(
      `ID of the project to add the task to.
       If not set, task will be added to the inbox`
    ),
  section_id: z.string().optional()
    .describe(
      `ID of the section to add the task to`
    ),
});

// Input schema for retrieving a task
export const GetTaskSchema = z.object({
  task_id: z.string().min(1, `Task ID is required`)
    .describe(`The ID of the task to retrieve`),
});

// Schema for listing and filtering tasks
export const ListTasksSchema = z.object({
  project_id: z.string().optional()
    .describe(`Filter tasks by project ID`),

  label: z.string().optional()
    .describe(`Filter tasks by label name`),

  section_id: z.string().optional()
    .describe(`Filter tasks by section ID`),

  parent_id: z.string().optional()
    .describe(`Filter tasks by parent task ID`),

  limit: z.number().min(1).max(200).optional()
    .describe(
      `Maximum number of items to return (1-200).
       Default: 50`
    ),
});

// Input schema for closing a task (marking as complete)
export const CloseTaskSchema = z.object({
  task_id: z.string().min(1, `Task ID is required`)
    .describe(`The ID of the task to close/complete`),
});

// Input schema for reopening a task (marking as incomplete)
export const ReopenTaskSchema = z.object({
  task_id: z.string().min(1, `Task ID is required`)
    .describe(`The ID of the task to reopen/mark as incomplete`),
});

// Input schema for deleting a task
export const DeleteTaskSchema = z.object({
  task_id: z.string().min(1, `Task ID is required`)
    .describe(`The ID of the task to delete`),
});

export type AddTaskInput = z.infer<typeof AddTaskSchema>;
export type GetTaskInput = z.infer<typeof GetTaskSchema>;
export type ListTasksInput = z.infer<typeof ListTasksSchema>;
export type CloseTaskInput = z.infer<typeof CloseTaskSchema>;
export type ReopenTaskInput = z.infer<typeof ReopenTaskSchema>;
export type DeleteTaskInput = z.infer<typeof DeleteTaskSchema>;
