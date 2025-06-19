import { z } from 'zod';

// Input schema for adding a label
export const AddLabelSchema = z.object({
  name: z.string().min(1, 'Label name is required')
    .describe('The name of the label'),

  color: z
    .enum([
      'berry_red',
      'light_blue',
      'red',
      'blue',
      'orange',
      'grape',
      'yellow',
      'violet',
      'olive_green',
      'lavender',
      'lime_green',
      'magenta',
      'green',
      'salmon',
      'mint_green',
      'charcoal',
      'teal',
      'grey',
      'sky_blue',
    ])
    .optional()
    .describe('The color of the label'),

  isFavorite: z.boolean().optional()
    .describe('Whether to mark the label as a favorite'),

  order: z.number().int().nullable().optional()
    .describe('Order of the label in the label list')
});

// Input schema for retrieving a label
export const GetLabelSchema = z.object({
  label_id: z.string().min(1, 'Label ID is required')
    .describe('The ID of the label to retrieve')
});

// Schema for listing labels
export const ListLabelsSchema = z.object({
  cursor: z.string().nullable().optional()
    .describe('Cursor for pagination'),

  limit: z.number().min(1).max(200).optional()
    .describe(
      'Maximum number of items to return (1-200). Default: 50'
    )
});

// Input schema for updating a label
export const UpdateLabelSchema = z.object({
  label_id: z.string().min(1, 'Label ID is required')
    .describe('The ID of the label to update'),

  name: z.string().min(1, 'Label name is required')
    .describe('The updated name of the label'),
  color: z
    .enum([
      'berry_red',
      'light_blue',
      'red',
      'blue',
      'orange',
      'grape',
      'yellow',
      'violet',
      'olive_green',
      'lavender',
      'lime_green',
      'magenta',
      'green',
      'salmon',
      'mint_green',
      'charcoal',
      'teal',
      'grey',
      'sky_blue',
    ])
    .optional()
    .describe('The color of the label'),

  isFavorite: z.boolean().optional()
    .describe('Whether to mark the label as a favorite'),

  order: z.number().int().nullable().optional()
    .describe('Order of the label in the label list')
});

// Input schema for deleting a label
export const DeleteLabelSchema = z.object({
  label_id: z.string().min(1, 'Label ID is required')
    .describe('The ID of the label to delete')
});

export type AddLabelInput = z.infer<typeof AddLabelSchema>;
export type GetLabelInput = z.infer<typeof GetLabelSchema>;
export type ListLabelsInput = z.infer<typeof ListLabelsSchema>;
export type UpdateLabelInput = z.infer<typeof UpdateLabelSchema>;
export type DeleteLabelInput = z.infer<typeof DeleteLabelSchema>;
