import {
  ICreateStudentData,
  StudentsRepository,
} from "../_repositories/StudentsRepository";

export class UpdateStudent {
  constructor(private studentsRepository: StudentsRepository) {}
  async execute(
    id: string,
    { age, height, email, name, weight }: ICreateStudentData
  ) {
    this.studentsRepository.update(id, {
      age,
      height,
      name,
      weight,
      email,
    });
  }
}
