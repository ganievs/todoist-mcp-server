import { z } from 'zod';
import { logger } from '../logger.js';
import { ToolDefinition, ToolHandler, ToolResponse } from './types.js';


export class ToolRegistry {
  private tools: Map<string, ToolDefinition> = new Map();
  private handlers: Map<string, ToolHandler> = new Map();

  /**
   * Register a tool with its definition and handler
   */
  registerTool(tool: ToolDefinition, handler: ToolHandler): ToolRegistry {
    this.tools.set(tool.name, tool);
    this.handlers.set(tool.name, handler);
    logger.debug(`Registered tool: ${tool.name}`);
    return this;
  }

  /**
   * Get all registered tool definitions
   */

  ListTools(): ToolDefinition[] {
    logger.info("Received ListToolsRequest");
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
  async handleCallTool(request: any): Promise<ToolResponse> {
    logger.info(`Received CallTool request for ${request.params.name}`);

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

      const result = await toolHandler.handler(args);

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

