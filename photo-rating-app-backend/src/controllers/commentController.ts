import { Request, Response } from 'express';
import Comment from '../models/Comment';

export const addComment = async (req: Request, res: Response): Promise<void> => {
    const { photoId, text, createdBy } = req.body;

    try {
        const newComment = new Comment({
            photoId,
            text,
            createdBy
        });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Failed to add comment:', error);
        res.status(500).json({ message: 'Failed to add comment' });
    }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    const { commentId } = req.params;

    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Failed to delete comment:', error);
        res.status(500).json({ message: 'Failed to delete comment' });
    }
};

export const getCommentsByPhotoId = async (req: Request, res: Response): Promise<void> => {
    const { photoId } = req.params;
    console.log(photoId);
    try {
        const comments = await Comment.find({ photoId: parseInt(photoId) });
        res.status(200).json(comments);
    } catch (error) {
        console.error('Failed to get comments:', error);
        res.status(500).json({ message: 'Failed to fetch comments' });
    }
};
