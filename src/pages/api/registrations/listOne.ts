import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function StudentsListOne(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query as any;
  const result = await prisma.registrations.findUnique({
    where: {
      id,
    },
    include: {
      option: true,
      student: true,
    },
  });

  return response.status(201).json(result);
}
