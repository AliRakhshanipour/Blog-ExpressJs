import { Router } from 'express';
import { PostController } from '../modules/post/post.controller.js';

const router = Router();
router.get('/', PostController.getPosts);
router.get('/:id', PostController.getPostById);
router.post('/create', PostController.createPost);

export { router as PostRoutes };
