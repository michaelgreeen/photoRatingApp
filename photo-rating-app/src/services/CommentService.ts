import { API_BASE_URL } from "../config";
import { IComment, NewComment } from "../models/Comment";

export const addComment = async (comment: NewComment): Promise<IComment> => {
    const response = await fetch(`${API_BASE_URL}/api/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    });

    if (!response.ok) {
        throw new Error('Failed to add comment');
    }

    return await response.json();
};

export const deleteComment = async (commentId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
        }
    });

    if (!response.ok) {
        throw new Error('Failed to delete comment');
    }

    return await response.json();
};

export const fetchCommentsByPhotoId = async (photoId: number): Promise<IComment[]> => {
    const response = await fetch(`${API_BASE_URL}/api/comments/photo/${photoId}`, {
    });

    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }

    return await response.json();
};
