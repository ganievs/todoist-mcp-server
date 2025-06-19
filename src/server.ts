import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ToolRegistry } from "./tools/tools.js";
import { registerTaskTools } from "./tools/task/index.js";
import { registerProjectTools } from "./tools/project/index.js";
import { registerSectionTools } from "./tools/section/index.js";
import { registerLabelTools } from "./tools/label/index.js";
import { TodoistApi } from "@doist/todoist-api-typescript";

// Initialize API with access token
const API_TOKEN = process.env.TODOIST_API_TOKEN ?? '';

const api = new TodoistApi(API_TOKEN)

const server = new Server({
  name: "todoist-mcp-server",
  version: "0.1.0",
}, {
  capabilities: {
    tools: {}
  }
});

const tools = new ToolRegistry(api);
registerTaskTools(tools);
registerProjectTools(tools);
registerSectionTools(tools);
registerLabelTools(tools);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: tools.ListTools()
  }
});

server.setRequestHandler(CallToolRequestSchema, async (request: {
  params: { name: string; _meta?: any; arguments?: Record<string, any> };
  method: string;
}): Promise<any> => {
  return tools.handleCallTool(request)
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`[INFO] Todoist MCP Server running on stdio`);
}

export default runServer;
