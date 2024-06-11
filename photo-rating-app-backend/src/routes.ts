import { Router } from 'express';
import { addPhoto, fetchPhotoById, increasePhotoScore, getTopPhotos, getAllPhotos, decreasePhotoScore, deletePhotoById } from './controllers/photoController';
import { addComment, deleteComment, getCommentsByPhotoId } from './controllers/commentController';

export const router = Router();

router.post('/photos', addPhoto);
router.get('/photos/top', getTopPhotos);
router.get('/photos/:id', fetchPhotoById);
router.post('/photos/delete/:id', deletePhotoById);
router.post('/photos/like/:id', increasePhotoScore);
router.post('/photos/dislike/:id', decreasePhotoScore);
router.get('/photos', getAllPhotos);

router.post('/comments', addComment);
router.delete('/comments/:commentId', deleteComment);
router.get('/comments/photo/:photoId', getCommentsByPhotoId);