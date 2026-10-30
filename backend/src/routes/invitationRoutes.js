import { Router } from 'express';
import { createInvitation } from '../controllers/invitationController.js';

const router = Router();

router.post('/', createInvitation);

export default router;
