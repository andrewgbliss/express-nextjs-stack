import express from 'express';
import ApiRoutes from './api';
import { requireUser } from '../../middleware';

const router = express.Router();

router.use('/', requireUser(), ApiRoutes);

export default router;
