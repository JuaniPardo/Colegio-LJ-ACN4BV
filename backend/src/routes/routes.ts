import express from 'express';
import { getUserData, login, register } from '../controllers/authController';

const router = express.Router();

router.post('/api/login', login)
router.post('/api/register', register)
router.post('/api/get-user-data', getUserData)

export default router