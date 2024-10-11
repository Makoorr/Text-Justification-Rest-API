import { Router } from 'express';
import { justifyText } from '../controllers/justifyController';
import { auth } from '../controllers/tokenController';
import { isAuth } from '../middlewares/authentication';
import { rateLimitMiddleware } from '../middlewares/justifyLimit';

const router = Router();

router.post('/token', auth);
router.post('/justify', isAuth as any, rateLimitMiddleware as any, justifyText);

export default router;