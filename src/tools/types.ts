import { z } from 'zod';

export interface SuccessResponse {
  success: true;
  message: string;
  data?: any;
}

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: any;
}

export interface ToolHandler {
  schema: z.ZodType<any>;
  handler: (args: any) => Promise<any>;
}

export interface ToolResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

