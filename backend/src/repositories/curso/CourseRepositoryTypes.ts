export type Course = {
  _id: string,
  course_name: string,
  description: string,
  img_url: string,
  user_list: Array<string>,
  professor_list: Array<string>,
  is_active: boolean,
}

export type CourseBasicInfo = {
  course_name: string,
  description: string,
  img_url: string,
  is_active: boolean
}

export interface CourseUpdateInfo extends CourseBasicInfo {
  _id: string
}

export interface CourseCreateInfo extends CourseBasicInfo {
  creator_id: string
}