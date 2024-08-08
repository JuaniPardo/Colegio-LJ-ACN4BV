import express from 'express';
import { login, create, logout, getUserTypes, refresh, getUserBasicInfo, getAllUsers, update, getUserData, deleteUser } from '../controllers/authController';

const router = express.Router();

// AUTH RELATED ROUTES
router.post('/api/login', login)
router.post('/api/logout', logout)
router.post('/api/token/refresh', refresh)
router.post('/api/user-info', getUserBasicInfo)
// USERS RELATED ROUTES
router.post('/api/users', create)
router.get('/api/users/types', getUserTypes)
router.delete('/api/users/:id', deleteUser)
router.put('/api/users/:id', update)
router.get('/api/users/:id', getUserData)
router.get('/api/users', getAllUsers)
export default router