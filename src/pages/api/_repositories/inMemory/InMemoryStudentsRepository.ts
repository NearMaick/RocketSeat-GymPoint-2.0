import { randomUUID } from "crypto";
import { ICreateStudentData, StudentsRepository } from "../StudentsRepository";

interface IStudentProps {
  name: string;
  email: string;
  height: number;
  weight: number;
  age: number;
}
export class InMemoryStudentsRepository implements StudentsRepository {
  public students = [];

  async create({
    name,
    email,
    height,
    weight,
    age,
  }: ICreateStudentData): Promise<void> {
    this.students.push({
      data: {
        id: randomUUID(),
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        email,
        name,
      },
    });
  }

  async findByEmail(email: string): Promise<IStudentProps> {
    return this.students.find((student) => student.data.email === email);
  }

  async listAll(): Promise<IStudentProps[]> {
    return this.students;
  }
}
