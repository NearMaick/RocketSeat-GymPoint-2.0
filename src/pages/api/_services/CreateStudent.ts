import { StudentsRepository } from "../_repositories/StudentsRepository";

interface ICreateStudentRequest {
  name: string;
  email: string;
  height: number;
  weight: number;
  age: number;
}

export class CreateStudent {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({ name, email, height, weight, age }: ICreateStudentRequest) {
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
