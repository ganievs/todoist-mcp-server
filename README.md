# Todoist MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with Todoist, enabling AI assistants to manage tasks, projects, labels, sections, and comments through the Todoist API.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ganievs/todoist-mcp-server.git
cd todoist-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Configuration

### Environment Variables

Set your Todoist API token:
```bash
export TODOIST_API_TOKEN="your_api_token_here"
```

To get your API token:
1. Go to [Todoist Settings](https://app.todoist.com/app/settings/integrations/developer)
2. Scroll down to the "API token" section
3. Copy your personal API token

### MCP Client Configuration

Add the server to your MCP client configuration. For Claude Desktop, add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "todoist": {
      "command": "node",
      "args": ["/path/to/todoist-mcp-server/build/index.js"],
      "env": {
        "TODOIST_API_TOKEN": "your_api_token_here"
      }
    }
  }
}
```

## Usage

Once configured, you can use natural language to interact with Todoist through your MCP client:

- "Create a task to buy groceries with high priority"
- "List all my projects"
- "Add a comment to the task about the meeting"
- "Create a new project for my vacation planning"
- "Show me all tasks with the 'urgent' label"

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/ganievs/todoist-mcp-server/issues) page.
