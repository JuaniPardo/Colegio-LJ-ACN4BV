import express from 'express';
import { login, register, logout, getUserTypes } from '../controllers/authController';

const router = express.Router();

router.post('/api/login', login)
router.post('/api/register', register)
router.post('/api/logout', logout)
router.post('/api/user-types', getUserTypes)
export default router