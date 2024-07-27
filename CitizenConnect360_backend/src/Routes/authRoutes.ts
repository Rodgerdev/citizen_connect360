import express from 'express';
import { register, login, getUsers, forgotPassword, deleteUser } from '../Controllers/authController';
import { authenticateToken, authorizeRoles } from '../Middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticateToken, authorizeRoles(['admin','citizen']), getUsers);
router.get('/users/:id', authenticateToken, authorizeRoles(['admin','government','citizen']), getUsers);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), deleteUser);
router.post('/forgot-password', forgotPassword);


export default router;
