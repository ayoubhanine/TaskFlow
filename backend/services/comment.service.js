import Comment from "../models/comment.model.js";
import Task from "../models/task.model.js";

export const createComment = async ({
  content,
  task,
  author,
}) => {
  const existingTask = await Task.findById(task);

  if (!existingTask) {
    throw new Error("Task not found");
  }

  const comment = await Comment.create({
    content,
    task,
    author,
  });

  return comment;
};

export const getCommentsByTask = async (taskId) => {
  const existingTask = await Task.findById(taskId);

  if (!existingTask) {
    throw new Error("Task not found");
  }

  const comments = await Comment.find({ task: taskId })
    .populate("author", "firstName lastName email")
    .sort({ createdAt: -1 });

  return comments;
};

export const getCommentById = async (commentId) => {
  const comment = await Comment.findById(commentId)
    .populate("author", "firstName lastName email")
    .populate("task", "title");

  if (!comment) {
    throw new Error("Comment not found");
  }

  return comment;
};

export const updateComment = async (
  commentId,
  content,
  userId,
  userRole
) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new Error("Comment not found");
  }

  const isAuthor = comment.author.toString() === userId;
  const isAdmin = userRole === "admin";

  if (!isAuthor && !isAdmin) {
    throw new Error("You can only update your own comments");
  }

  comment.content = content;

  await comment.save();

  return comment;
};

export const deleteComment = async (
  commentId,
  userId,
  userRole
) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new Error("Comment not found");
  }

  const isAuthor = comment.author.toString() === userId;
  const isAdmin = userRole === "admin";

  if (!isAuthor && !isAdmin) {
    throw new Error("You can only delete your own comments");
  }

  await comment.deleteOne();

  return comment;
};