import { randomUUID } from "crypto";
import { ICreateStudentData, StudentsRepository } from "../StudentsRepository";

export class InMemoryStudentsRepository implements StudentsRepository {
  public items = [];

  async create({
    name,
    email,
    height,
    weight,
    age,
  }: ICreateStudentData): Promise<void> {
    this.items.push({
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
}
