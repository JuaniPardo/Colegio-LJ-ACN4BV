import express from 'express';
import { login, create, logout, getUserTypes, refresh, getUserBasicInfo, getAllUsers, update } from '../controllers/authController';

const router = express.Router();

// USER RELATED ROUTES
router.post('/api/login', login)
router.post('/api/create', create)
router.post('/api/user/update', update)
router.post('/api/logout', logout)
router.get('/api/user-types', getUserTypes)
router.get('/api/get-users', getAllUsers)
router.post('/api/user-info', getUserBasicInfo)
router.post('/api/token/refresh', refresh)
export default router