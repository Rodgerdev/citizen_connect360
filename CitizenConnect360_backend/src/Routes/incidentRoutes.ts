import express from 'express';
import { addIncident, getIncidents, updateIncident, deleteIncident } from '../Controllers/incidentController';
import { authenticateToken, authorizeRoles } from '../Middlewares/authMiddleware';

const router = express.Router();

router.post('', authenticateToken, authorizeRoles(['citizen']), addIncident);
router.get('', authenticateToken, authorizeRoles(['citizen', 'government']), getIncidents);
router.get('/:id', authenticateToken, authorizeRoles(['citizen', 'government']), getIncidents);
router.put('/incidents', authenticateToken, authorizeRoles(['citizen']), updateIncident);
router.delete('/incidents', authenticateToken, authorizeRoles(['citizen']), deleteIncident);

export default router;
