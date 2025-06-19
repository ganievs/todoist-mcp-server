import { z } from 'zod';

// Attachment schema for comments
export const AttachmentSchema = z.object({
  file_name: z.string().optional()
    .describe('The file name'),

  file_type: z.string().optional()
    .describe('The file MIME type (e.g., "image/png", "application/pdf")'),

  file_url: z.string().url().optional()
    .describe('The file URL - must be a valid URL'),

  resource_type: z.string().optional()
    .describe('The resource type (e.g., "file", "image")')
});

// Input schema for adding a comment
export const AddCommentSchema = z.object({
  task_id: z.string().optional()
    .describe('The ID of the task to add the comment to'),

  project_id: z.string().optional()
    .describe('The ID of the project to add the comment to (alternative to task_id)'),

  content: z.string().min(1, 'Comment content is required').max(16384)
    .describe(
      'The comment content. This value may contain markdown-formatted text and hyperlinks. Maximum length: 16384 characters'
    ),

  attachment: AttachmentSchema.optional()
    .describe('Optional file attachment for the comment')
}).refine(
  (data) => data.task_id || data.project_id,
  {
    message: "Either task_id or project_id must be provided",
    path: ["task_id"]
  }
);

// Input schema for retrieving a comment
export const GetCommentSchema = z.object({
  comment_id: z.string().min(1, 'Comment ID is required')
    .describe('The ID of the comment to retrieve')
});

// Schema for listing comments
export const ListCommentsSchema = z.object({
  task_id: z.string().optional()
    .describe('Filter comments by task ID - returns all comments for the specified task'),

  project_id: z.string().optional()
    .describe('Filter comments by project ID - returns all comments for tasks in the specified project'),

  cursor: z.string().nullable().optional()
    .describe('Cursor for pagination - use the next_cursor from previous response'),

  limit: z.number().min(1).max(200).optional().default(50)
    .describe('Maximum number of items to return (1-200). Default: 50')
}).refine(
  (data) => data.task_id || data.project_id || (!data.task_id && !data.project_id),
  {
    message: "Cannot specify both task_id and project_id",
    path: ["task_id"]
  }
);

// Input schema for updating a comment
export const UpdateCommentSchema = z.object({
  comment_id: z.string().min(1, 'Comment ID is required')
    .describe('The ID of the comment to update'),

  content: z.string().min(1, 'Comment content is required').max(16384)
    .describe(
      'The updated comment content. This value may contain markdown-formatted text and hyperlinks'
    )
});

// Input schema for deleting a comment
export const DeleteCommentSchema = z.object({
  comment_id: z.string().min(1, 'Comment ID is required')
    .describe('The ID of the comment to delete')
});

export type AddCommentInput = z.infer<typeof AddCommentSchema>;
export type GetCommentInput = z.infer<typeof GetCommentSchema>;
export type ListCommentsInput = z.infer<typeof ListCommentsSchema>;
export type UpdateCommentInput = z.infer<typeof UpdateCommentSchema>;
export type DeleteCommentInput = z.infer<typeof DeleteCommentSchema>;
export type AttachmentInput = z.infer<typeof AttachmentSchema>;
