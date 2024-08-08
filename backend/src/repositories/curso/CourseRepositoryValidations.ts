export class CursoRepositoryValidation {
  static courseName(courseName: string) {
    if (typeof courseName !== "string") {
      throw new Error("courseName must be a string");
    }
    if (courseName.length < 3) {
      throw new Error("courseName must be at least 3 characters long");
    }
  }

  static imgURL(img_url: string) {
    if (typeof img_url !== "string") {
      throw new Error("img_url must be a string");
    }
    if (img_url.length < 3) {
      throw new Error("img_url must be at least 3 characters long");
    }
  }

  static description(description: string) {
    if (typeof description !== "string") {
      throw new Error("description must be a string");
    }
    if (description.length < 10) {
      throw new Error("description must be at least 10 characters long");
    }
  }
  
  static is_active(is_active: boolean) {
    if (typeof is_active !== "boolean") {
      throw new Error("is_active must be a boolean");
    }
  }
}