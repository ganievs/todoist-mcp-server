import { ToolRegistry } from '../tools.js';
import {
  AddSectionSchema,
  GetSectionSchema,
  ListSectionsSchema,
  UpdateSectionSchema,
  DeleteSectionSchema
} from './schemas.js';
import {
  addSection,
  getSection,
  listSections,
  updateSection,
  deleteSection
} from './operations.js';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const registerSectionTools = (registry: ToolRegistry) => {
  registry
    .registerTool(
      {
        name: "add_section",
        description: "Create a new section in a Todoist project",
        inputSchema: zodToJsonSchema(AddSectionSchema)
      },
      {
        schema: AddSectionSchema,
        handler: addSection
      }
    )
    .registerTool(
      {
        name: "get_section",
        description: "Get details of a Todoist section",
        inputSchema: zodToJsonSchema(GetSectionSchema)
      },
      {
        schema: GetSectionSchema,
        handler: getSection
      }
    )
    .registerTool(
      {
        name: "list_sections",
        description: "List all sections in a Todoist project",
        inputSchema: zodToJsonSchema(ListSectionsSchema)
      },
      {
        schema: ListSectionsSchema,
        handler: listSections
      }
    )
    .registerTool(
      {
        name: "update_section",
        description: "Update an existing Todoist section",
        inputSchema: zodToJsonSchema(UpdateSectionSchema)
      },
      {
        schema: UpdateSectionSchema,
        handler: updateSection
      }
    )
    .registerTool(
      {
        name: "delete_section",
        description: "Delete a Todoist section",
        inputSchema: zodToJsonSchema(DeleteSectionSchema)
      },
      {
        schema: DeleteSectionSchema,
        handler: deleteSection
      }
    );
}
