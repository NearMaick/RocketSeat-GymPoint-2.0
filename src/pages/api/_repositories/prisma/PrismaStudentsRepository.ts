import { prisma } from "../../../../lib/prisma";
import { ICreateStudentData, StudentsRepository } from "../StudentsRepository";

export class PrismaStudentsRepository implements StudentsRepository {
  async create({
    name,
    email,
    height,
    weight,
    age,
  }: ICreateStudentData): Promise<void> {
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
}
