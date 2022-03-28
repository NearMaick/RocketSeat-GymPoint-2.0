import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function RegistrationsList(
  _request: NextApiRequest,
  response: NextApiResponse
) {
  const result = await prisma.registrations.findMany({
    include: {
      option: true,
      student: true,
    },
  });
  return response.json(result);
}
