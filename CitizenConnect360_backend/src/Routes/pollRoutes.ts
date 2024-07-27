import express from 'express';
import { addPoll, getPolls, updatePoll, deletePoll } from '../Controllers/pollController';
import { authenticateToken, authorizeRoles } from '../Middlewares/authMiddleware';

const router = express.Router();

router.post('', authenticateToken, authorizeRoles(['government']), addPoll);
router.get('', authenticateToken, authorizeRoles(['citizen', 'government']), getPolls);
router.put('', authenticateToken, authorizeRoles(['government']), updatePoll);
router.delete('', authenticateToken, authorizeRoles(['government']), deletePoll);

export default router;
