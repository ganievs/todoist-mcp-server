import { ZodError } from 'zod';
import {
  AddTaskInput,
  UpdateTaskInput,
  GetTaskInput,
  CloseTaskInput,
  ReopenTaskInput,
  DeleteTaskInput,
  ListTasksInput,
} from './schemas.js';
import {
  SuccessResponse,
  ErrorResponse,
} from '../types.js';
import { TodoistApi } from '@doist/todoist-api-typescript';


export const addTask = async (api: TodoistApi, input: AddTaskInput): Promise<SuccessResponse | ErrorResponse> => {
  try {

    const task = await api.addTask(input);
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

export const updateTask = async (api: TodoistApi, input: UpdateTaskInput): Promise<SuccessResponse | ErrorResponse> => {
  try {

    const task = await api.updateTask(input.task_id, {
      content: input.content,
      description: input.description,
      priority: input.priority,
      labels: input.labels,
    });
    return {
      success: true,
      message: 'Task updated successfully',
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

export const getTask = async (api: TodoistApi, input: GetTaskInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const task = api.getTask(input.task_id);
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

export const listTasks = async (api: TodoistApi, input: ListTasksInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const tasks = await api.getTasks(input);
    return {
      success: true,
      message: 'Tasks retrieved successfully',
      //!TODO add pagination support
      data: tasks.results,
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
};

export const closeTask = async (api: TodoistApi, input: CloseTaskInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const response = await api.closeTask(input.task_id);
    if (!response) {
      return {
        success: false,
        message: 'Unable to close the task'
      }
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

export const reopenTask = async (api: TodoistApi, input: ReopenTaskInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const response = await api.reopenTask(input.task_id);
    if (!response) {
      return {
        success: false,
        message: 'Unable to reopen the task'
      }
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

export const deleteTask = async (api: TodoistApi, input: DeleteTaskInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const responce = api.deleteTask(input.task_id);
    if (!responce) {
      return {
        success: false,
        message: 'Unable to delete the task'
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
