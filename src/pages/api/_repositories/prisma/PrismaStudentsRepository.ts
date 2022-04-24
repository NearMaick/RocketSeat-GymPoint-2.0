import { prisma } from "../../../../lib/prisma";
import {
  IListStudentData,
  IStudentData,
  StudentsRepository,
} from "../StudentsRepository";

export class PrismaStudentsRepository implements StudentsRepository {
  async create({
    name,
    email,
    height,
    weight,
    age,
  }: IStudentData): Promise<void> {
    await prisma.students.create({
      data: {
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        email,
        name,
      },
    });
  }

  findByEmail(email: string): Promise<IStudentData> {
    throw new Error("Method not implemented.");
  }

  listAll(): Promise<IListStudentData[]> {
    throw new Error("Method not implemented.");
  }

  update(id: string, data: IStudentData): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
