import express from 'express';
import { login, create, logout, getUserTypes, refresh, getUserBasicInfo, getAllUsers, update, getUserData, deleteUser } from '../controllers/authController';
import { CourseController } from '../controllers/courseController';

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
// COURSES RELATED ROUTES
router.get('/api/user-courses', CourseController.getAccessibleCourses)
router.get('/api/courses', CourseController.getAllCourses)
router.post('/api/courses', CourseController.create)
router.get('/api/courses/:id', CourseController.getCourseByID)
router.put('/api/courses/:id', CourseController.updateCourseByID)
router.put('/api/courses/:id/add-student', CourseController.addStudent)
router.put('/api/courses/:id/add-professor', CourseController.addProfessor)
router.delete('/api/courses/:id/remove-student', CourseController.removeStudent)
router.delete('/api/courses/:id/remove-professor', CourseController.removeProfessor)
router.delete('/api/courses/:id', CourseController.deleteCourseByID)
export default router