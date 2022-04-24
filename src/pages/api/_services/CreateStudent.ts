import {
  IStudentData,
  StudentsRepository,
} from "../_repositories/StudentsRepository";

export class CreateStudent {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({ name, email, height, weight, age }: IStudentData) {
    const student = await this.studentsRepository.findByEmail(email);

    if (student) {
      throw new Error("This email is already in use");
    }

    await this.studentsRepository.create({
      name,
      email,
      height,
      weight,
      age,
    });
  }
}
