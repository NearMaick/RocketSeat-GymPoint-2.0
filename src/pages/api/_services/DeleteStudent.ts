import { StudentsRepository } from "../_repositories/StudentsRepository";

export class DeleteStudent {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(id: string) {
    return this.studentsRepository.delete(id);
  }
}
