import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import {
  AddTaskSchema,
  GetTaskSchema,
  CloseTaskSchema,
  ReopenTaskSchema,
  DeleteTaskSchema,
} from './schemas.js';
import todoistHandler from './handler.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";


const server = new Server({
  name: "gitlab-mcp-server",
  version: "0.1.0",
}, {
  capabilities: {
    tools: {}
  }
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  console.info("Received ListToolsRequest");
  return {
    tools: [
      {
        name: "add_task",
        description: "Create a TODO task",
        inputSchema: zodToJsonSchema(AddTaskSchema)
      },
      {
        name: "get_task",
        description: "Get a TODO task",
        inputSchema: zodToJsonSchema(GetTaskSchema)
      },
      {
        name: "close_task",
        description: "Close a TODO task",
        inputSchema: zodToJsonSchema(CloseTaskSchema)
      },
      {
        name: "reopen_task",
        description: "Reopen a TODO task",
        inputSchema: zodToJsonSchema(ReopenTaskSchema)
      },
      {
        name: "delete_task",
        description: "Delete a TODO task",
        inputSchema: zodToJsonSchema(DeleteTaskSchema)
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request): Promise<any> => {
  try {
    if (!request.params.arguments) {
      throw new Error("Arguments are required");
    }
    switch (request.params.name) {
      case "add_task": {
        const args = AddTaskSchema.parse(request.params.arguments)
        const result = await todoistHandler.addTask(args);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(result, null, 2)
          }],
        }
      }
      case "get_task": {
        const args = GetTaskSchema.parse(request.params.arguments)
        const result = await todoistHandler.getTask(args);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(result, null, 2)
          }],
        }
      }
      case "close_task": {
        const args = CloseTaskSchema.parse(request.params.arguments)
        const result = await todoistHandler.closeTask(args);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(result, null, 2)
          }],
        }
      }
      case "reopen_task": {
        const args = ReopenTaskSchema.parse(request.params.arguments)
        const result = await todoistHandler.reopenTask(args);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(result, null, 2)
          }],
        }
      }
      case "delete_task": {
        const args = DeleteTaskSchema.parse(request.params.arguments)
        const result = await todoistHandler.deleteTask(args);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(result, null, 2)
          }],
        }
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid arguments: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
    }
    throw error;
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Todoist MCP Server running on stdio");
}

export default runServer;
