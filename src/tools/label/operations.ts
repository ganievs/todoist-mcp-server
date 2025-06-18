import { ZodError } from 'zod';
import {
  AddLabelInput,
  GetLabelInput,
  UpdateLabelInput,
  DeleteLabelInput,
  ListLabelsInput,
} from './schemas.js';
import {
  SuccessResponse,
  ErrorResponse,
} from '../types.js';
import { TodoistApi } from '@doist/todoist-api-typescript';


export const addLabel = async (api: TodoistApi, input: AddLabelInput): Promise<SuccessResponse | ErrorResponse> => {
  try {

    const label = await api.addLabel(input);
    return {
      success: true,
      message: 'Label added successfully',
      data: label
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

export const getLabel = async (api: TodoistApi, input: GetLabelInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const label = api.getLabel(input.label_id);
    return {
      success: true,
      message: 'Label retrieved successfully',
      data: label
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

export const listLabels = async (api: TodoistApi, input: ListLabelsInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const labels = await api.getLabels(input);
    return {
      success: true,
      message: 'Labels retrieved successfully',
      //!TODO add pagination support
      data: labels.results,
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

export const deleteLabel = async (api: TodoistApi, input: DeleteLabelInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const responce = api.deleteLabel(input.label_id);
    if (!responce) {
      return {
        success: false,
        message: 'Unable to delete the label'
      };
    }
    return {
      success: true,
      message: 'Label deleted successfully'
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
