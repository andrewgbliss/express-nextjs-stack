import express from 'express';
import PrivateApiRoutes from './private';
import PublicApiRoutes from './public';

const router = express.Router();

router.use('/api', [PublicApiRoutes, PrivateApiRoutes]);

export default router;
