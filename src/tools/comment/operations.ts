import { ZodError } from 'zod';
import {
  AddCommentInput,
  UpdateCommentInput,
  GetCommentInput,
  DeleteCommentInput,
  ListCommentsInput,
} from './schemas.js';
import {
  SuccessResponse,
  ErrorResponse,
} from '../types.js';
import {
  AddCommentArgs,
  GetProjectCommentsArgs,
  GetTaskCommentsArgs,
  TodoistApi
} from '@doist/todoist-api-typescript';


export const addComment = async (api: TodoistApi, input: AddCommentInput): Promise<SuccessResponse | ErrorResponse> => {
  let commentArgs: AddCommentArgs

  // Set either taskId or projectId based on input
  if (input.task_id) {
    commentArgs = {
      content: input.content,
      taskId: input.task_id,
    }
  } else if (input.project_id) {
    commentArgs = {
      content: input.content,
      projectId: input.project_id,
    }
  } else {
    return {
      success: false,
      error: 'Unexpected error. Neither taskId nor projectId are provided'
    }
  }

  // Add attachment if provided
  if (input.attachment) {
    commentArgs.attachment = {
      fileName: input.attachment.file_name,
      fileType: input.attachment.file_type,
      fileUrl: input.attachment.file_url,
      resourceType: input.attachment.resource_type
    };
  }

  try {
    const comment = await api.addComment(commentArgs);
    return {
      success: true,
      message: 'Comment added successfully',
      data: comment
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

export const updateComment = async (api: TodoistApi, input: UpdateCommentInput): Promise<SuccessResponse | ErrorResponse> => {
  try {

    const comment = await api.updateComment(input.comment_id, {
      content: input.content,
    });
    return {
      success: true,
      message: 'Comment updated successfully',
      data: comment
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

export const getComment = async (api: TodoistApi, input: GetCommentInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const comment = api.getComment(input.comment_id);
    return {
      success: true,
      message: 'Comment retrieved successfully',
      data: comment
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

export const listComments = async (api: TodoistApi, input: ListCommentsInput): Promise<SuccessResponse | ErrorResponse> => {
  let listCommentsArgs: GetTaskCommentsArgs | GetProjectCommentsArgs

  // Set either taskId or projectId based on input
  if (input.task_id) {
    listCommentsArgs = {
      taskId: input.task_id,
      cursor: input.cursor || null,
      limit: input.limit,
    }
  } else if (input.project_id) {
    listCommentsArgs = {
      projectId: input.project_id,
      cursor: input.cursor || null,
      limit: input.limit,
    }
  } else {
    return {
      success: false,
      error: 'Unexpected error. Neither taskId nor projectId are provided'
    }
  }

  try {
    const comments = await api.getComments(listCommentsArgs);
    return {
      success: true,
      message: 'Comments retrieved successfully',
      data: {
        results: comments.results,
        next_cursor: comments.nextCursor,
        total_count: comments.results,
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
};

export const deleteComment = async (api: TodoistApi, input: DeleteCommentInput): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const responce = api.deleteComment(input.comment_id);
    if (!responce) {
      return {
        success: false,
        message: 'Unable to delete the comment'
      };
    }
    return {
      success: true,
      message: 'Comment deleted successfully'
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
