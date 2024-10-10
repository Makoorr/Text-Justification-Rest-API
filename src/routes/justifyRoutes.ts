import { Router } from 'express';
import { justifyText } from '../controllers/justifyController';

const router = Router();

router.post('/', justifyText);

export default router;