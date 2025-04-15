import { ZodError } from 'zod';
import {
  AddTaskInput,
  GetTaskInput,
  CloseTaskInput,
  ReopenTaskInput,
  DeleteTaskInput,
  SuccessResponse,
  ErrorResponse,
} from './schemas.js';

// API Token would usually be stored in .env file and accessed via process.env
const API_TOKEN = 'your_todoist_api_token';
const API_URL = 'https://api.todoist.com/rest/v2';

class TodoistHandler {
  async addTask(input: AddTaskInput): Promise<SuccessResponse | ErrorResponse> {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({
          content: input.content,
          description: input.description,
          due_string: input.due_string,
          priority: input.priority,
          project_id: input.project_id
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || 'Failed to add task'
        };
      }

      const task = await response.json();
      return {
        success: true,
        message: 'Task added successfully',
        data: task
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          success: false,
          error: 'Validation error: ' + error.errors.map(e => e.message).join(', ')
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getTask(input: GetTaskInput): Promise<SuccessResponse | ErrorResponse> {
    try {
      const response = await fetch(`${API_URL}/tasks/${input.task_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || 'Failed to get task'
        };
      }

      const task = await response.json();
      return {
        success: true,
        message: 'Task retrieved successfully',
        data: task
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          success: false,
          error: 'Validation error: ' + error.errors.map(e => e.message).join(', ')
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async closeTask(input: CloseTaskInput): Promise<SuccessResponse | ErrorResponse> {
    try {
      const response = await fetch(`${API_URL}/tasks/${input.task_id}/close`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || 'Failed to close task'
        };
      }

      return {
        success: true,
        message: 'Task closed successfully'
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          success: false,
          error: 'Validation error: ' + error.errors.map(e => e.message).join(', ')
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async reopenTask(input: ReopenTaskInput): Promise<SuccessResponse | ErrorResponse> {
    try {
      const response = await fetch(`${API_URL}/tasks/${input.task_id}/reopen`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || 'Failed to reopen task'
        };
      }

      return {
        success: true,
        message: 'Task reopened successfully'
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          success: false,
          error: 'Validation error: ' + error.errors.map(e => e.message).join(', ')
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async deleteTask(input: DeleteTaskInput): Promise<SuccessResponse | ErrorResponse> {
    try {
      const response = await fetch(`${API_URL}/tasks/${input.task_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || 'Failed to delete task'
        };
      }

      return {
        success: true,
        message: 'Task deleted successfully'
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          success: false,
          error: 'Validation error: ' + error.errors.map(e => e.message).join(', ')
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

export default new TodoistHandler();
