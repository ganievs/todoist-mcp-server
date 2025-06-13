import { ToolRegistry } from '../tools.js';
import {
  AddProjectSchema,
  GetProjectSchema,
  ListProjectsSchema,
  UpdateProjectSchema,
  DeleteProjectSchema,
  GetProjectCollaboratorsSchema
} from './schemas.js';
import {
  addProject,
  getProject,
  listProjects,
  updateProject,
  deleteProject,
  getProjectCollaborators
} from './operations.js';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const registerProjectTools = (registry: ToolRegistry) => {
  registry
    .registerTool(
      {
        name: "add_project",
        description: "Create a new Todoist project",
        inputSchema: zodToJsonSchema(AddProjectSchema)
      },
      {
        schema: AddProjectSchema,
        handler: addProject
      }
    )
    .registerTool(
      {
        name: "get_project",
        description: "Get details of a Todoist project",
        inputSchema: zodToJsonSchema(GetProjectSchema)
      },
      {
        schema: GetProjectSchema,
        handler: getProject
      }
    )
    .registerTool(
      {
        name: "list_projects",
        description: "List all Todoist projects",
        inputSchema: zodToJsonSchema(ListProjectsSchema)
      },
      {
        schema: ListProjectsSchema,
        handler: listProjects
      }
    )
    .registerTool(
      {
        name: "update_project",
        description: "Update an existing Todoist project",
        inputSchema: zodToJsonSchema(UpdateProjectSchema)
      },
      {
        schema: UpdateProjectSchema,
        handler: updateProject
      }
    )
    .registerTool(
      {
        name: "delete_project",
        description: "Delete a Todoist project",
        inputSchema: zodToJsonSchema(DeleteProjectSchema)
      },
      {
        schema: DeleteProjectSchema,
        handler: deleteProject
      }
    )
    .registerTool(
      {
        name: "get_project_collaborators",
        description: "Get collaborators for a Todoist project",
        inputSchema: zodToJsonSchema(GetProjectCollaboratorsSchema)
      },
      {
        schema: GetProjectCollaboratorsSchema,
        handler: getProjectCollaborators
      }
    );
}
