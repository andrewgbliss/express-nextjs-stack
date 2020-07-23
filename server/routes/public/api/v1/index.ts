import express from 'express';
import healthcheck from './healthcheck';
import info from './info';
import auth from './auth';

const router = express.Router();

router.use('/healthcheck', healthcheck);
router.use('/info', info);
router.use('/', auth);

export default router;
