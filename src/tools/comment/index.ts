import { ToolRegistry } from '../tools.js';
import {
  AddCommentSchema,
  UpdateCommentSchema,
  GetCommentSchema,
  DeleteCommentSchema,
  ListCommentsSchema
} from './schemas.js';
import {
  addComment,
  updateComment,
  getComment,
  deleteComment,
  listComments
} from './operations.js';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const registerCommentTools = (registry: ToolRegistry) => {
  registry
    .registerTool(
      {
        name: "add_comment",
        description: "Add a comment to a task",
        inputSchema: zodToJsonSchema(AddCommentSchema)
      },
      {
        schema: AddCommentSchema,
        handler: addComment
      }
    )
    .registerTool(
      {
        name: "update_comment",
        description: "Update a comment",
        inputSchema: zodToJsonSchema(UpdateCommentSchema)
      },
      {
        schema: UpdateCommentSchema,
        handler: updateComment
      }
    )
    .registerTool(
      {
        name: "get_comment",
        description: "Get a comment",
        inputSchema: zodToJsonSchema(GetCommentSchema)
      },
      {
        schema: GetCommentSchema,
        handler: getComment
      }
    )
    .registerTool(
      {
        name: "list_comments",
        description: "List and filter comments",
        inputSchema: zodToJsonSchema(ListCommentsSchema)
      },
      {
        schema: ListCommentsSchema,
        handler: listComments
      }
    )
    .registerTool(
      {
        name: "delete_comment",
        description: "Delete a comment",
        inputSchema: zodToJsonSchema(DeleteCommentSchema)
      },
      {
        schema: DeleteCommentSchema,
        handler: deleteComment
      }
    );
}
