import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function StudentsList(
  _request: NextApiRequest,
  response: NextApiResponse
) {
  const result = await prisma.student.findMany();
  return response.json(result);
}
