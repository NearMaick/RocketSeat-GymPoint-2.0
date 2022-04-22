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
    await this.studentsRepository.create({
      name,
      email,
      height,
      weight,
      age,
    });
  }
}
