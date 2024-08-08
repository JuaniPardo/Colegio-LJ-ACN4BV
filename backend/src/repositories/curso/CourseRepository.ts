// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import DBLocal from "db-local";
import crypto from "crypto";
import { CursoRepositoryValidation } from "./CourseRepositoryValidations";
import { CourseNameAlreadyTakenError, CourseNotFoundError, CourseRepositoryDBError, ProfessorAlreadyInCourse, ProfessorNotFoundInCourse, StudentAlreadyInCourse, StudentNotFoundInCourse } from "./CourseRepositoryErrors";
import { Course, CourseBasicInfo, CourseCreateInfo, CourseUpdateInfo } from "./CourseRepositoryTypes";
const { Schema } = new DBLocal({ path: "./db" });

// TODO: agregar lista de profesores
const Course = Schema("Course", {
  _id: { type: String, required: true },
  course_name: { type: String, required: true },
  description: { type: String, required: true },
  img_url: { type: String, required: true },
  // FIX user_list ---> student_list
  user_list: { type: Array, required: true },
  professor_list: { type: Array, required: true },
  is_active: { type: Boolean, required: true }
});

export class CourseRepository {
  static async all() {
    try {
      const courses = Course.find();
      return courses;
    } catch {
      throw new CourseRepositoryDBError("Error getting courses from db");
    }
  }

  static async allAccesible({user_id}) {
    try {
      const courses = Course.find((record: Course) => {
        return record.user_list.find((id) => user_id === id) || record.professor_list.find((id) => user_id === id)
      });
      return courses;
    } catch {
      throw new CourseRepositoryDBError("Error getting courses from db");
    }
  }

  static async findByID({ _id }): Course {
    try {
      const courseFound = await Course.findOne({ _id })
      return courseFound;
    } catch {
      throw new CourseRepositoryDBError("Error getting course " + _id + " from db")
    }
  }

  static async create({ creator_id, course_name, description, img_url, is_active }: CourseCreateInfo) {
    // 1. Validations
    CursoRepositoryValidation.courseName(course_name);
    CursoRepositoryValidation.description(description);
    CursoRepositoryValidation.is_active(is_active);
    CursoRepositoryValidation.imgURL(img_url);
    // 2. Check course doesn't exists
    const course = Course.findOne((obj) => {
      return obj.course_name === course_name;
    });
    // 3. Throw error if course exists
    if (course) {
      throw new CourseNameAlreadyTakenError("A course with specified name already exists");
    }
    const id = crypto.randomUUID();

    Course.create({
      _id: id,
      course_name,
      description,
      img_url,
      user_list: [],
      professor_list: [creator_id],
      is_active,
    }).save();

    return id;
  }

  static async updateInfo({ _id, course_name, description, img_url, is_active }: CourseUpdateInfo) {
    // 1. Validations
    CursoRepositoryValidation.courseName(course_name);
    CursoRepositoryValidation.description(description);
    CursoRepositoryValidation.imgURL(img_url);
    CursoRepositoryValidation.is_active(is_active);
    // 2. Check user doesn't exists
    const foundCourse = Course.findOne({ _id });
    if (!foundCourse) {
      throw new CourseNotFoundError("Course with specified id not found");
    }
    if (course.course_name === course_name) {
      throw new CourseNameAlreadyTakenError("A course with specified name already exists");
    }
    foundCourse
      .update({
        course_name,
        description,
        img_url,
        is_active,
      })
      .save();

    return _id;
  }

  static async addProfessor({ course_id, professor_id }: {course_id: string, professor_id: string}) {
    const foundCourse: Course = Course.findOne({ _id:course_id });
    if (!foundCourse) {
      throw new CourseNotFoundError("Course with specified id not found");
    }
    const isInList = foundCourse.professor_list.find((x) => x === professor_id)
    if(isInList) {
      throw new ProfessorAlreadyInCourse("Professor is already in the list");
    }
    foundCourse
      .update({
        professor_list: [...foundCourse.professor_list, professor_id],
      })
      .save();

    return professor_id;
  }

  static async removeProfessor({ course_id, professor_id }: {course_id: string, professor_id: string}) {
    const foundCourse: Course = Course.findOne({ _id:course_id });
    if (!foundCourse) {
      throw new CourseNotFoundError("Course with specified id not found");
    }

    const isInList = foundCourse.professor_list.find((x) => x === professor_id)
    if(!isInList) {
      throw new ProfessorNotFoundInCourse("Professor is not in the list");
    }

    const newProfessorList = foundCourse.user_list.filter((x) => x != professor_id)
    foundCourse
      .update({
        professor_list: newProfessorList,
      })
      .save();

    return professor_id;
  }

  static async addStudent({ course_id, student_id }: {course_id: string, student_id: string}) {
    const foundCourse: Course = Course.findOne((obj) => {
      return obj._id === course_id
    });
    if (!foundCourse) {
      throw new CourseNotFoundError("Course with specified id not found");
    }
    const isInList = foundCourse.user_list.find((x) => x === student_id)
    if(isInList) {
      throw new StudentAlreadyInCourse("Student is already in the list");
    }
    foundCourse
      .update({
        user_list: [...foundCourse.user_list, student_id],
      })
      .save();

    return student_id;
  }

  static async removeStudent({ course_id, student_id }: {course_id: string, student_id: string}) {
    const foundCourse: Course = Course.findOne({ _id: course_id });
    if (!foundCourse) {
      throw new CourseNotFoundError("Course with specified id not found");
    }
    const newUserList = foundCourse.user_list.filter((x) => x != student_id)

    const isInList = foundCourse.user_list.find((x) => x === student_id)
    if(!isInList) {
      throw new StudentNotFoundInCourse("Student is not in the list");
    }

    foundCourse
      .update({
        user_list: newUserList,
      })
      .save();

    return student_id;
  }

  static deleteCourse({ _id }): CourseBasicInfo {
    const courseFound = Course.findOne({ _id });
    if (!courseFound) {
      throw new CourseNotFoundError("Course with specified id not found");
    }
    Course.remove({ _id });
    return courseFound;
  }
}
