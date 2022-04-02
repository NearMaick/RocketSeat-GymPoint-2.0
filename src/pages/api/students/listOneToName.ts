import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function StudentsListOneToName(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { name } = request.query as any;
  const result = await prisma.students.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });

  return response.status(201).json(result);
}
