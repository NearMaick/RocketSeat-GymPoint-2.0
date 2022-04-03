import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function CreateStudent(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { name, email, height, weight, age } = request.body;

  const result = await prisma.students.create({
    data: {
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      email,
      name,
    },
  });

  return response.status(201).json(result);
}
