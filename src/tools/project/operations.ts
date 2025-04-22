import { ZodError } from 'zod';
import {
  AddProjectInput,
  GetProjectInput,
  ListProjectsInput,
  UpdateProjectInput,
  DeleteProjectInput,
  GetProjectCollaboratorsInput
} from './schemas.js';
import {
  SuccessResponse,
  ErrorResponse,
} from '../types.js';
import { TodoistApi } from '@doist/todoist-api-typescript';

export const addProject = async (api: TodoistApi, input: AddProjectInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const project = await api.addProject({
      name: input.name,
      parentId: input.parent_id,
      color: input.color,
      isFavorite: input.is_favorite,
      viewStyle: input.view_style
    });
    
    return {
      success: true,
      message: 'Project added successfully',
      data: project
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

export const getProject = async (api: TodoistApi, input: GetProjectInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const project = await api.getProject(input.project_id);
    return {
      success: true,
      message: 'Project retrieved successfully',
      data: project
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

export const listProjects = async (api: TodoistApi, input: ListProjectsInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const projects = await api.getProjects({
      cursor: input.cursor || undefined,
      limit: input.limit
    });
    
    return {
      success: true,
      message: 'Projects retrieved successfully',
      data: {
        results: projects.results,
        next_cursor: projects.nextCursor
      }
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

export const updateProject = async (api: TodoistApi, input: UpdateProjectInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const project = await api.updateProject(input.project_id, {
      name: input.name,
      color: input.color,
      isFavorite: input.is_favorite,
      viewStyle: input.view_style
    });
    
    return {
      success: true,
      message: 'Project updated successfully',
      data: project
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

export const deleteProject = async (api: TodoistApi, input: DeleteProjectInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const response = await api.deleteProject(input.project_id);
    if (!response) {
      return {
        success: false,
        message: 'Unable to delete the project'
      };
    }
    
    return {
      success: true,
      message: 'Project deleted successfully'
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

export const getProjectCollaborators = async (api: TodoistApi, input: GetProjectCollaboratorsInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const collaborators = await api.getProjectCollaborators(input.project_id, {
      cursor: input.cursor || undefined,
      limit: input.limit
    });
    
    return {
      success: true,
      message: 'Project collaborators retrieved successfully',
      data: {
        results: collaborators.results,
        next_cursor: collaborators.nextCursor
      }
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
