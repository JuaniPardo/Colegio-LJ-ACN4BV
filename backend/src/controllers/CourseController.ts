import { Request, Response } from "express";
import "dotenv/config";
import { CourseRepository } from "../repositories/curso/CourseRepository";
import { CourseBasicInfo } from "../repositories/curso/CourseRepositoryTypes";
import { USER_TYPES_MAP } from "../repositories/UserRepository";
import { ProfessorAlreadyInCourse, ProfessorNotFoundInCourse, StudentAlreadyInCourse, StudentNotFoundInCourse } from "../repositories/curso/CourseRepositoryErrors";

export class CourseController {
  static getAllCourses = async (req: Request, res: Response) => {
    // extract user from request
    const user = req.session?.user;
    // validate user is authenticated
    if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
    // validate user is admin
    if (user.user_type !== USER_TYPES_MAP.ADMINISTRATOR) return res.status(403).json({ success: false, message: "You are unauthorized to perform this action." });
    try {
      const courses = await CourseRepository.all();
      return res.status(200).json({ success: true, data: courses });
    } catch {
      return res.status(500).json({ success: false, message: "Internal server error getting courses" });
    }
  };

  static getAccessibleCourses = async (req: Request, res: Response) => {
    // extract user from request
    const user = req.session?.user;
    // validate user is authenticated
    if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
    // validate user is admin
    try {
      const courses = await CourseRepository.allAccesible({ user_id: user._id });
      return res.status(200).json({ success: true, data: courses });
    } catch {
      return res.status(500).json({ success: false, message: "Internal server error getting courses" });
    }
  };

  static getCourseByID = async (req: Request, res: Response) => {
    // extract user from request
    const user = req.session?.user;
    // validate user is authenticated
    if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
    // validate user is student
    const isStudent = user.user_type === USER_TYPES_MAP.STUDENT;
    const isProfessor = user.user_type === USER_TYPES_MAP.PROFESOR;
    // validate id in request params
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "id path param is required" });
    // get course from db
    try {
      const course = await CourseRepository.findByID({ _id: id });
      // validate student is in the course
      if (!course) return res.status(404).json({ success: false, response_code: 404, message: "Course not found" });
      if (isStudent) {
        const studentInCourse = course.user_list.find((listUser) => user._id === listUser);
        if (!studentInCourse) return res.status(403).json({ success: false, response_code: 403, message: "You are not authorized to perform this action" });
      } else if (isProfessor) {
        const professorInList = course.professor_list.find((listProfessor) => user._id === listProfessor);
        if (!professorInList) return res.status(403).json({ success: false, response_code: 403, message: "You are not authorized to perform this action" });
      }
      return res.status(200).json({ success: true, data: course });
    } catch {
      return res.status(500).json({ success: false, response_code: 500, message: "Internal Server Error" });
    }
  };

  static create = async (req: Request, res: Response) => {
    // extract user from request
    const user = req.session?.user;
    // validate user is authenticated
    if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
    // validate user is authorized
    const isAdmin = user.user_type === USER_TYPES_MAP.ADMINISTRATOR;
    const isProfessor = user.user_type === USER_TYPES_MAP.PROFESOR;
    if (!isAdmin && !isProfessor) return res.status(403).json({ success: false, message: "You are unauthorized to perform this action." });
    // 1. Get data in request body
    const { course_name, description, is_active, img_url }: CourseBasicInfo = req.body;
    // 2. Validate data
    let missingField: string | null = null;
    if (!course_name) missingField = "course_name is required";
    if (!description) missingField = "description is required";
    if (!is_active) missingField = "is_active is required";
    if (!img_url) missingField = "img_url is required";
    if (missingField != null) return res.status(400).json({ message: `${missingField}` });
    // 3. Connect to db
    try {
      const id = await CourseRepository.create({
        creator_id: user._id,
        course_name,
        description,
        img_url,
        is_active,
      });
      res.status(201).json({ success: true, id });
    } catch (err: any) {
      // CATCH CUSTOM ERRORS
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

  static updateCourseByID = async (req: Request, res: Response) => {
    // extract user from request
    const user = req.session?.user;
    // validate user is authenticated
    if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
    // validate user is authorized
    const isAdmin = user.user_type === USER_TYPES_MAP.ADMINISTRATOR;
    const isProfessor = user.user_type === USER_TYPES_MAP.PROFESOR;
    if (!isAdmin && !isProfessor) return res.status(403).json({ success: false, message: "You are unauthorized to perform this action." });
    // 1. Get data in request body
    const { course_name, description, is_active, img_url }: CourseBasicInfo = req.body;
    // 2. Validate data
    let missingField: string | null = null;
    if (!course_name) missingField = "course_name is required";
    if (!description) missingField = "description is required";
    if (!is_active) missingField = "is_active is required";
    if (!img_url) missingField = "img_url is required";
    if (missingField != null) return res.status(400).json({ message: `${missingField}` });
    // 3. Connect to db
    try {
      const id = await CourseRepository.create({
        creator_id: "lala",
        course_name,
        description,
        img_url,
        is_active,
      });
      res.status(201).json({ success: true, id });
    } catch (err: any) {
      // CATCH CUSTOM ERRORS
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

  static deleteCourseByID = async (req: Request, res: Response) => {
    // extract user from request
    const user = req.session?.user;
    // validate user is authenticated
    if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
    // validate user is admin
    if (user.user_type !== USER_TYPES_MAP.ADMINISTRATOR) return res.status(403).json({ success: false, message: "You are unauthorized to perform this action." });
    // get id from path params
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "Course id is required." });
    try {
      const courses = await CourseRepository.deleteCourse({ _id: id });
      return res.status(200).json({ success: true, data: courses });
    } catch {
      return res.status(500).json({ success: false, message: "Internal server error getting users" });
    }
  };

  static addStudent = async (req: Request, res: Response) => {
    // extract user from request
    const user = req.session?.user;
    // validate user is authenticated
    if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
    // validate user is authorized
    const isAdmin = user.user_type === USER_TYPES_MAP.ADMINISTRATOR;
    const isProfessor = user.user_type === USER_TYPES_MAP.PROFESOR;
    if (!isAdmin && !isProfessor) return res.status(403).json({ success: false, message: "You are unauthorized to perform this action." });
    // validate id in request params
    const { student_id } = req.body;
    const { id } = req.params
    if (!id) return res.status(400).json({ success: false, message: "id path param is required" });
    if (!student_id) return res.status(400).json({ success: false, message: "student_id body param is required" });
    try {
      const course = await CourseRepository.findByID({ _id: id });
      // validate student is in the course
      if (!course) return res.status(404).json({ success: false, response_code: 404, message: "Course not found" });
      if (isProfessor) {
        const professorInList = course.professor_list.find((listProfessor) => user._id === listProfessor);
        if (!professorInList) return res.status(403).json({ success: false, response_code: 403, message: "You are not authorized to perform this action" });
      }
      const addedId = await CourseRepository.addStudent({ course_id: course._id, student_id: student_id });
      res.status(200).json({ success: true, message:`${addedId} added successfully to student list` });
    } catch (err: any) {
      if(err instanceof StudentAlreadyInCourse) {
        return res.status(400).json({ success: false, message: "Student is already in the list" });
      }
      // CATCH CUSTOM ERRORS
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

  static addProfessor = async (req: Request, res: Response) => {
    // extract user from request
    const user = req.session?.user;
    // validate user is authenticated
    if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
    // validate user is authorized
    const isAdmin = user.user_type === USER_TYPES_MAP.ADMINISTRATOR;
    const isProfessor = user.user_type === USER_TYPES_MAP.PROFESOR;
    if (!isAdmin && !isProfessor) return res.status(403).json({ success: false, message: "You are unauthorized to perform this action." });
    // validate id in request params
    const { professor_id } = req.body;
    const { id } = req.params
    if (!id) return res.status(400).json({ success: false, message: "id path param is required" });
    if (!professor_id) return res.status(400).json({ success: false, message: "professor_id body param is required" });
    try {
      const course = await CourseRepository.findByID({ _id: id });
      // validate student is in the course
      if (!course) return res.status(404).json({ success: false, response_code: 404, message: "Course not found" });
      if (isProfessor) {
        const professorInList = course.professor_list.find((listProfessor) => user._id === listProfessor);
        if (!professorInList) return res.status(403).json({ success: false, response_code: 403, message: "You are not authorized to perform this action" });
      }
      const addedId = await CourseRepository.addProfessor({ course_id: course._id, professor_id: professor_id });
      res.status(200).json({ success: true, message:`${addedId} added successfully to professor list` });
    } catch (err: any) {
      if(err instanceof ProfessorAlreadyInCourse) {
        return res.status(400).json({ success: false, message: "Professor is already in the list of professors" });
      }
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

  static removeStudent = async (req: Request, res: Response) => {
    // extract user from request
    const user = req.session?.user;
    // validate user is authenticated
    if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
    // validate user is authorized
    const isAdmin = user.user_type === USER_TYPES_MAP.ADMINISTRATOR;
    const isProfessor = user.user_type === USER_TYPES_MAP.PROFESOR;
    if (!isAdmin && !isProfessor) return res.status(403).json({ success: false, message: "You are unauthorized to perform this action." });
    // validate id in request params
    const { student_id } = req.body;
    const { id } = req.params
    if (!id) return res.status(400).json({ success: false, message: "id path param is required" });
    if (!student_id) return res.status(400).json({ success: false, message: "student_id body param is required" });
    try {
      const course = await CourseRepository.findByID({ _id: id });
      // validate student is in the course
      if (!course) return res.status(404).json({ success: false, response_code: 404, message: "Course not found" });
      if (isProfessor) {
        const professorInList = course.professor_list.find((listProfessor) => user._id === listProfessor);
        if (!professorInList) return res.status(403).json({ success: false, response_code: 403, message: "You are not authorized to perform this action" });
      }
      const addedId = await CourseRepository.removeStudent({ course_id: course._id, student_id: student_id });
      res.status(200).json({ success: true, message:`${addedId} removed successfully to student list` });
    } catch (err: any) {
      if(err instanceof StudentNotFoundInCourse) {
        return res.status(404).json({ success: false, message: "Student is not in the list of students" });
      }
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

  static removeProfessor = async (req: Request, res: Response) => {
    // extract user from request
    const user = req.session?.user;
    // validate user is authenticated
    if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
    // validate user is authorized
    const isAdmin = user.user_type === USER_TYPES_MAP.ADMINISTRATOR;
    const isProfessor = user.user_type === USER_TYPES_MAP.PROFESOR;
    if (!isAdmin && !isProfessor) return res.status(403).json({ success: false, message: "You are unauthorized to perform this action." });
    // validate id in request params
    const { professor_id } = req.body;
    const { id } = req.params
    if (!id) return res.status(400).json({ success: false, message: "id path param is required" });
    if (!professor_id) return res.status(400).json({ success: false, message: "professor_id body param is required" });
    try {
      const course = await CourseRepository.findByID({ _id: id });
      // validate student is in the course
      if (!course) return res.status(404).json({ success: false, response_code: 404, message: "Course not found" });
      if (isProfessor) {
        const professorInList = course.professor_list.find((listProfessor) => user._id === listProfessor);
        if (!professorInList) return res.status(403).json({ success: false, response_code: 403, message: "You are not authorized to perform this action" });
      }
      const addedId = await CourseRepository.removeProfessor({ course_id: course._id, professor_id: professor_id });
      res.status(200).json({ success: true, message:`${addedId} removed successfully to professor list` });
    } catch (err: any) {
      if(err instanceof ProfessorNotFoundInCourse) {
        return res.status(404).json({ success: false, message: "Professor is not in the list of professors" });
      }
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
}