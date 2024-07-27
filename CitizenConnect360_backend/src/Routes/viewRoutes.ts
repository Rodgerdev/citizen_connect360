import express from 'express';
import { addView, getViews, updateView, deleteView } from '../Controllers/viewController';
import { authenticateToken, authorizeRoles } from '../Middlewares/authMiddleware';

const router = express.Router();

router.post('', authenticateToken, authorizeRoles(['citizen']), addView);
router.get('', authenticateToken, authorizeRoles(['citizen', 'government']), getViews);
router.put('/:id', authenticateToken, authorizeRoles(['citizen']), updateView);
router.delete('/:id', authenticateToken, authorizeRoles(['citizen']), deleteView);

export default router;
