import express from 'express';
import { login, create, logout, getUserTypes, refresh, getUserBasicInfo } from '../controllers/authController';

const router = express.Router();

// USER RELATED ROUTES
router.post('/api/login', login)
router.post('/api/create', create)
router.post('/api/logout', logout)
router.post('/api/user-types', getUserTypes)
router.post('/api/user-info', getUserBasicInfo)
router.post('/api/token/refresh', refresh)
export default router