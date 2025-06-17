import { z } from 'zod';

// Input schema for adding a project
export const AddProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required')
    .describe('The name of the project'),
  
  parent_id: z.string().optional()
    .describe('ID of the parent project'),
  
  color: z.string().optional()
    .describe('Color of the project (e.g. "berry_red", "blue", "green")'),
  
  is_favorite: z.boolean().optional()
    .describe('Whether the project is a favorite'),
  
  view_style: z.enum(['list', 'board', 'calendar']).optional()
    .describe('The view style of the project (list, board, or calendar)')
});

// Input schema for retrieving a project
export const GetProjectSchema = z.object({
  project_id: z.string().min(1, 'Project ID is required')
    .describe('The ID of the project to retrieve')
});

// Schema for listing projects
export const ListProjectsSchema = z.object({
  cursor: z.string().nullable().optional()
    .describe('Cursor for pagination'),
  
  limit: z.number().min(1).max(200).optional()
    .describe(
      'Maximum number of items to return (1-200). Default: 50'
    )
});

// Input schema for updating a project
export const UpdateProjectSchema = z.object({
  project_id: z.string().min(1, 'Project ID is required')
    .describe('The ID of the project to update'),
  
  name: z.string().optional()
    .describe('The updated name of the project'),
  
  color: z.string().optional()
    .describe('The updated color of the project'),
  
  is_favorite: z.boolean().optional()
    .describe('Whether the project is a favorite'),
  
  view_style: z.enum(['list', 'board', 'calendar']).optional()
    .describe('The view style of the project (list, board, or calendar)')
});

// Input schema for deleting a project
export const DeleteProjectSchema = z.object({
  project_id: z.string().min(1, 'Project ID is required')
    .describe('The ID of the project to delete')
});

// Input schema for getting project collaborators
export const GetProjectCollaboratorsSchema = z.object({
  project_id: z.string().min(1, 'Project ID is required')
    .describe('The ID of the project to get collaborators for'),
  
  cursor: z.string().nullable().optional()
    .describe('Cursor for pagination'),
  
  limit: z.number().min(1).max(200).optional()
    .describe(
      'Maximum number of items to return (1-200). Default: 50'
    )
});

export type AddProjectInput = z.infer<typeof AddProjectSchema>;
export type GetProjectInput = z.infer<typeof GetProjectSchema>;
export type ListProjectsInput = z.infer<typeof ListProjectsSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
export type DeleteProjectInput = z.infer<typeof DeleteProjectSchema>;
export type GetProjectCollaboratorsInput = z.infer<typeof GetProjectCollaboratorsSchema>;
