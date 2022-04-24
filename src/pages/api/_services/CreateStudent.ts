import {
  ICreateStudentData,
  StudentsRepository,
} from "../_repositories/StudentsRepository";

export class CreateStudent {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({ name, email, height, weight, age }: ICreateStudentData) {
    const student = await this.studentsRepository.findByEmail(email);

    if (student) {
      throw new Error("This email is already use");
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
