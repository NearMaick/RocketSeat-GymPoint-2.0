import { randomUUID } from "crypto";
import {
  IListStudentData,
  IStudentData,
  StudentsRepository,
} from "../StudentsRepository";

interface IStudentProps {
  id?: string;
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
  }: IStudentData): Promise<void> {
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

  async listAll(): Promise<IListStudentData[]> {
    return this.students;
  }

  async update(
    id: string,
    { age, name, height, weight }: IStudentData
  ): Promise<void> {
    const index = this.students.findIndex((student) => student.data.id === id);

    this.students.splice(index, 1, {
      data: {
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        name,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const index = this.students.findIndex((student) => student.data.id === id);

    this.students.splice(index, 1);
  }
}
