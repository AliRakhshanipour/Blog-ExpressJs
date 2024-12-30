import { Router } from 'express';
import { PostRoutes } from './post.routes.js';
import { UserRoutes } from './user.routes.js';

const router = Router();
router.use('/posts', PostRoutes);
router.use('/auth', UserRoutes);

export { router as MainRoutes };
