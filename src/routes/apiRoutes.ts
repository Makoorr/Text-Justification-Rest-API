import { Router } from 'express';
import { justifyText } from '../controllers/justifyController';
import { auth } from '../controllers/tokenController';

const router = Router();

router.post('/token', auth as any);
router.post('/justify', justifyText);

export default router;