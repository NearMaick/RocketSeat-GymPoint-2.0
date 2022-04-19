import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function CreateStudent(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { student_id, option_id, created_at, finished_at, is_active } =
    request.body;

  const result = await prisma.registrations.create({
    data: {
      student_id,
      option_id,
      created_at,
      finished_at,
      is_active,
    },
  });

  return response.status(201).json(result);
}
