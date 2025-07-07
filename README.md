# Todoist MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with
Todoist, enabling AI assistants to manage tasks, projects, labels, sections, and
comments through the Todoist API.

## Configuration

This server requires a Todoist API token to function.

1. **Get your API token:**
   - Go to
     [Todoist Settings](https://app.todoist.com/app/settings/integrations/developer).
   - Scroll down to the "API token" section.
   - Copy your personal API token.

2. **Configure your MCP client:** Add the server to your MCP client
   configuration, making sure to include your API token. For Claude Desktop, you
   would add one of the following to your `claude_desktop_config.json`:

   #### Docker

   ```json
   {
     "mcpServers": {
       "todoist": {
         "command": "docker",
         "args": [
           "run",
           "-i",
           "--rm",
           "-e",
           "TODOIST_API_TOKEN=your_api_token_here",
           "ghcr.io/ganievs/todoist-mcp-server:latest"
         ]
       }
     }
   }
   ```

   #### NPX

   ```json
   {
     "mcpServers": {
       "todoist": {
         "command": "npx",
         "args": [
           "-y",
           "@ganiev/todoist-mcp-server"
         ],
         "env": {
           "TODOIST_API_TOKEN": "your_api_token_here"
         }
       }
     }
   }
   ```

## Usage

Once configured, you can use natural language to interact with Todoist through
your MCP client:

- "Create a task to buy groceries with high priority"
- "List all my projects"
- "Add a comment to the task about the meeting"
- "Create a new project for my vacation planning"
- "Show me all tasks with the 'urgent' label"

## Development

To set up the project for development:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ganievs/todoist-mcp-server.git
   cd todoist-mcp-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the linter:**
   ```bash
   npm run lint
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

## Support

For issues and feature requests, please use the
[GitHub Issues](https://github.com/ganievs/todoist-mcp-server/issues) page.
