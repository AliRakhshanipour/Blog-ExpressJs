import { Router } from 'express';
import { PostRoutes } from './post.routes.js';

const router = Router();
router.use('/posts', PostRoutes);

export { router as MainRoutes };
