import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function StudentsListOne(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query as any;
  const result = await prisma.students.findUnique({
    where: {
      id,
    },
  });

  return response.status(201).json(result);
}
