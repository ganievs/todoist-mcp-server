import { z } from 'zod';
import { ToolDefinition, ToolHandler, ToolResponse } from './types.js';
import { TodoistApi } from '@doist/todoist-api-typescript';


export class ToolRegistry {
  private readonly api: TodoistApi;
  private tools: Map<string, ToolDefinition> = new Map();
  private handlers: Map<string, ToolHandler> = new Map();

  constructor(api: TodoistApi) {
    this.api = api;
  }

  /**
   * Register a tool with its definition and handler
   */
  registerTool(tool: ToolDefinition, handler: ToolHandler): ToolRegistry {
    this.tools.set(tool.name, tool);
    this.handlers.set(tool.name, handler);
    console.error(`[DEBUG] Registered tool: ${tool.name}`);
    return this;
  }

  /**
   * Get all registered tool definitions
   */

  ListTools(): ToolDefinition[] {
    console.error(`[INFO] Received ListToolsRequest`);
    return Array.from(this.tools.values());
  }

  /**
   * Get a specific tool handler by name
   */
  getToolHandler(name: string): ToolHandler | undefined {
    return this.handlers.get(name);
  }

  /**
   * Check if a tool exists
   */
  hasTool(name: string): boolean {
    return this.handlers.has(name);
  }

  /**
   * Handle the CallTool request
   */
  async handleCallTool(request: {
    params: { name: string; _meta?: any; arguments?: Record<string, any> };
    method: string;
  }): Promise<ToolResponse> {
    console.error(`[INFO] Received CallTool request for ${request.params.name}`);

    try {
      if (!request.params.arguments) {
        throw new Error("Arguments are required");
      }

      const toolName = request.params.name;
      const toolHandler = this.getToolHandler(toolName);

      if (!toolHandler) {
        throw new Error(`Unknown tool: ${toolName}`);
      }

      const args = toolHandler.schema.parse(request.params.arguments);

      const result = await toolHandler.handler(this.api, args);

      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }],
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Invalid arguments: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
      }
      throw error;
    }
  }
}

