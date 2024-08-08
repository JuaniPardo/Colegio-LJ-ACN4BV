export class CourseNameAlreadyTakenError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class CourseNotFoundError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class CourseRepositoryDBError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class StudentAlreadyInCourse extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class ProfessorAlreadyInCourse extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}


export class StudentNotFoundInCourse extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class ProfessorNotFoundInCourse extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}