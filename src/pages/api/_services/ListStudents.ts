import { StudentsRepository } from "../_repositories/StudentsRepository";

export class ListStudents {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(): Promise<any[]> {
    const students = await this.studentsRepository.listAll();

    return students;
  }
}
