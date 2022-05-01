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

  async findByEmail(email: string): Promise<IStudentData> {
    const student = await prisma.students.findUnique({
      where: {
        email,
      },
    });

    return student;
  }

  async listAll(): Promise<IListStudentData[]> {
    const students = await prisma.students.findMany();

    return students;
  }

  async update(id: string, data: IStudentData): Promise<void> {
    await prisma.students.update({
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        height: data.age,
        weight: data.age,
        age: data.age,
      },
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.students.delete({
      where: {
        id,
      },
    });
  }
}
