import { z } from 'zod';

// Input schema for adding a section
export const AddSectionSchema = z.object({
  name: z.string().min(1, 'Section name is required')
    .describe('The name of the section'),
  
  project_id: z.string().min(1, 'Project ID is required')
    .describe('ID of the project this section belongs to'),
  
  order: z.number().int().nullable().optional()
    .describe('Order of the section in the project')
});

// Input schema for retrieving a section
export const GetSectionSchema = z.object({
  section_id: z.string().min(1, 'Section ID is required')
    .describe('The ID of the section to retrieve')
});

// Schema for listing sections
export const ListSectionsSchema = z.object({
  project_id: z.string().min(1, 'Project ID is required')
    .describe('Filter sections by project ID'),
  
  cursor: z.string().nullable().optional()
    .describe('Cursor for pagination'),
  
  limit: z.number().min(1).max(200).optional()
    .describe(
      'Maximum number of items to return (1-200). Default: 50'
    )
});

// Input schema for updating a section
export const UpdateSectionSchema = z.object({
  section_id: z.string().min(1, 'Section ID is required')
    .describe('The ID of the section to update'),
  
  name: z.string().min(1, 'Section name is required')
    .describe('The updated name of the section')
});

// Input schema for deleting a section
export const DeleteSectionSchema = z.object({
  section_id: z.string().min(1, 'Section ID is required')
    .describe('The ID of the section to delete')
});

export type AddSectionInput = z.infer<typeof AddSectionSchema>;
export type GetSectionInput = z.infer<typeof GetSectionSchema>;
export type ListSectionsInput = z.infer<typeof ListSectionsSchema>;
export type UpdateSectionInput = z.infer<typeof UpdateSectionSchema>;
export type DeleteSectionInput = z.infer<typeof DeleteSectionSchema>;
