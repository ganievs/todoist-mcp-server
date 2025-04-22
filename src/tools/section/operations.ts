import { ZodError } from 'zod';
import {
  AddSectionInput,
  GetSectionInput,
  ListSectionsInput,
  UpdateSectionInput,
  DeleteSectionInput
} from './schemas.js';
import {
  SuccessResponse,
  ErrorResponse,
} from '../types.js';
import { TodoistApi } from '@doist/todoist-api-typescript';

export const addSection = async (api: TodoistApi, input: AddSectionInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const section = await api.addSection({
      name: input.name,
      projectId: input.project_id,
      order: input.order
    });
    
    return {
      success: true,
      message: 'Section added successfully',
      data: section
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

export const getSection = async (api: TodoistApi, input: GetSectionInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const section = await api.getSection(input.section_id);
    return {
      success: true,
      message: 'Section retrieved successfully',
      data: section
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

export const listSections = async (api: TodoistApi, input: ListSectionsInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const sections = await api.getSections({
      projectId: input.project_id,
      cursor: input.cursor || undefined,
      limit: input.limit
    });
    
    return {
      success: true,
      message: 'Sections retrieved successfully',
      data: {
        results: sections.results,
        next_cursor: sections.nextCursor
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

export const updateSection = async (api: TodoistApi, input: UpdateSectionInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const section = await api.updateSection(input.section_id, {
      name: input.name
    });
    
    return {
      success: true,
      message: 'Section updated successfully',
      data: section
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

export const deleteSection = async (api: TodoistApi, input: DeleteSectionInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const response = await api.deleteSection(input.section_id);
    if (!response) {
      return {
        success: false,
        message: 'Unable to delete the section'
      };
    }
    
    return {
      success: true,
      message: 'Section deleted successfully'
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
