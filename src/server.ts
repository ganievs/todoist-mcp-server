import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ToolRegistry } from "./tools/tools.js";
import { registerTaskTools } from "./tools/task/index.js";
import { registerProjectTools } from "./tools/project/index.js";
import { registerSectionTools } from "./tools/section/index.js";
import { registerLabelTools } from "./tools/label/index.js";
import { registerCommentTools } from "./tools/comment/index.js";
import { TodoistApi } from "@doist/todoist-api-typescript";
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Initialize API with access token
const API_TOKEN = process.env.TODOIST_API_TOKEN ?? '';

const api = new TodoistApi(API_TOKEN)

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf8')
);

const server = new Server({
  name: "todoist-mcp-server",
  version: packageJson.version,
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
registerCommentTools(tools);

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
