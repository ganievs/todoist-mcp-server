import { ToolRegistry } from '../tools.js';
import {
  AddTaskSchema,
  GetTaskSchema,
  CloseTaskSchema,
  ReopenTaskSchema,
  DeleteTaskSchema
} from './schemas.js';
import {
  addTask,
  getTask,
  closeTask,
  reopenTask,
  deleteTask
} from './operations.js';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const registerTaskTools = (registry: ToolRegistry) => {
  registry
    .registerTool(
      {
        name: "add_task",
        description: "Create a TODO task",
        inputSchema: zodToJsonSchema(AddTaskSchema)
      },
      {
        schema: AddTaskSchema,
        handler: addTask
      }
    )
    .registerTool(
      {
        name: "get_task",
        description: "Get a TODO task",
        inputSchema: zodToJsonSchema(GetTaskSchema)
      },
      {
        schema: GetTaskSchema,
        handler: getTask
      }
    )
    .registerTool(
      {
        name: "close_task",
        description: "Close a TODO task",
        inputSchema: zodToJsonSchema(CloseTaskSchema)
      },
      {
        schema: CloseTaskSchema,
        handler: closeTask
      }
    )
    .registerTool(
      {
        name: "reopen_task",
        description: "Reopen a TODO task",
        inputSchema: zodToJsonSchema(ReopenTaskSchema)
      },
      {
        schema: ReopenTaskSchema,
        handler: reopenTask
      }
    )
    .registerTool(
      {
        name: "delete_task",
        description: "Delete a TODO task",
        inputSchema: zodToJsonSchema(DeleteTaskSchema)
      },
      {
        schema: DeleteTaskSchema,
        handler: deleteTask
      }
    );
}
