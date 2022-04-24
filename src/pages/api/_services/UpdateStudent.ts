import {
  IStudentData,
  StudentsRepository,
} from "../_repositories/StudentsRepository";

export class UpdateStudent {
  constructor(private studentsRepository: StudentsRepository) {}
  async execute(
    id: string,
    { age, height, email, name, weight }: IStudentData
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
