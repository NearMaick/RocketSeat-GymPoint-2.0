import { NextApiRequest, NextApiResponse } from "next";
import { PrismaStudentsRepository } from "../_repositories/prisma/PrismaStudentsRepository";
import { CreateStudent } from "../_services/CreateStudent";

export default async function NextCreateStudent(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { name, email, height, weight, age } = request.body;

  const prismaStudentsRepository = new PrismaStudentsRepository();
  const createStudent = new CreateStudent(prismaStudentsRepository);

  try {
    await createStudent.execute({ name, email, height, weight, age });

    return response.status(201).send("");
  } catch (error: any) {
    return response.status(400).json({
      error: error.message,
    });
  }
}
