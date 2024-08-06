import express from 'express';
import { login, create, logout, getUserTypes, refresh, getUserBasicInfo, getAllUsers, update, getUserData } from '../controllers/authController';

const router = express.Router();

// USER RELATED ROUTES
router.post('/api/login', login)
router.post('/api/users/create', create)
router.post('/api/users/update', update)
router.post('/api/users/:id', getUserData)
router.post('/api/logout', logout)
router.get('/api/users/user-types', getUserTypes)
router.get('/api/users', getAllUsers)
router.post('/api/user-info', getUserBasicInfo)
router.post('/api/token/refresh', refresh)
export default router