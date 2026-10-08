import {
  createComment,
  getCommentsByTask,
  getCommentById,
  updateComment,
  deleteComment,
} from "../services/comment.service.js";

export const create = async (req, res) => {
  try {
    const comment = await createComment({
      content: req.body.content,
      task: req.body.task,
      author: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: comment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getByTask = async (req, res) => {
  try {
    const comments = await getCommentsByTask(req.params.taskId);

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const comment = await getCommentById(req.params.id);

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const comment = await updateComment(
      req.params.id,
      req.body.content,
      req.user.id,
      req.user.role
    );

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: comment,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    await deleteComment(
      req.params.id,
      req.user.id,
      req.user.role
    );

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};