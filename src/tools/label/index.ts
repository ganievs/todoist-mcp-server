import { ToolRegistry } from '../tools.js';
import {
  AddLabelSchema,
  GetLabelSchema,
  DeleteLabelSchema,
  ListLabelsSchema
} from './schemas.js';
import {
  addLabel,
  getLabel,
  deleteLabel,
  listLabels
} from './operations.js';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const registerLabelTools = (registry: ToolRegistry) => {
  registry
    .registerTool(
      {
        name: "add_label",
        description: "Create a label",
        inputSchema: zodToJsonSchema(AddLabelSchema)
      },
      {
        schema: AddLabelSchema,
        handler: addLabel
      }
    )
    .registerTool(
      {
        name: "get_label",
        description: "Get a label",
        inputSchema: zodToJsonSchema(GetLabelSchema)
      },
      {
        schema: GetLabelSchema,
        handler: getLabel
      }
    )
    .registerTool(
      {
        name: "list_labels",
        description: "List and filter labels",
        inputSchema: zodToJsonSchema(ListLabelsSchema)
      },
      {
        schema: ListLabelsSchema,
        handler: listLabels
      }
    )
    .registerTool(
      {
        name: "delete_label",
        description: "Delete a label",
        inputSchema: zodToJsonSchema(DeleteLabelSchema)
      },
      {
        schema: DeleteLabelSchema,
        handler: deleteLabel
      }
    );
}
