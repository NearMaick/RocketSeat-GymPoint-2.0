import {
  ICreateStudentData,
  StudentsRepository,
} from "../_repositories/StudentsRepository";

export class ListStudents {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(): Promise<ICreateStudentData[]> {
    const students = await this.studentsRepository.listAll();

    return students;
  }
}
