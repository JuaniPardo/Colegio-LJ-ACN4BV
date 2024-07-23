import express from 'express';
import { login, register } from '../controllers/authController';

const router = express.Router();

router.post('/api/login', login)
router.post('/api/register', register)

export default router