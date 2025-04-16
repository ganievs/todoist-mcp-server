import { boolean, z } from 'zod';

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface SuccessResponse {
  success: boolean;
  message: string;
  data?: any;
};

export interface ErrorResponse {
  success: boolean;
  error: string;
};

export interface ToolHandler {
  schema: z.ZodType<any>;
  handler: (args: any) => Promise<SuccessResponse | ErrorResponse>;
}

export interface ToolResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

