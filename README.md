# Todoist MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with Todoist, enabling AI assistants to manage tasks, projects, labels, sections, and comments through the Todoist API.

## Features

The server provides comprehensive tools for managing Todoist data:

### Task Management
- **add_task** - Create new TODO tasks with content, description, priority, and labels
- **update_task** - Modify existing tasks
- **get_task** - Retrieve specific task details
- **list_tasks** - List and filter tasks
- **close_task** - Mark tasks as completed
- **reopen_task** - Reopen completed tasks
- **delete_task** - Delete tasks permanently

### Project Management
- **add_project** - Create new projects
- **get_project** - Get project details
- **list_projects** - List all projects
- **update_project** - Modify project settings
- **delete_project** - Delete projects
- **get_project_collaborators** - View project collaborators

### Label Management
- **add_label** - Create new labels
- **get_label** - Get label details
- **list_labels** - List all labels
- **update_label** - Modify labels
- **delete_label** - Delete labels

### Section Management
- **add_section** - Create project sections
- **get_section** - Get section details
- **list_sections** - List sections
- **update_section** - Modify sections
- **delete_section** - Delete sections

### Comment Management
- **add_comment** - Add comments to tasks/projects
- **get_comment** - Get comment details
- **list_comments** - List comments
- **update_comment** - Update comments
- **delete_comment** - Delete comments

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
