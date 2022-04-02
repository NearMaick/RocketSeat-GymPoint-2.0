import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function RegistrationsList(
  _request: NextApiRequest,
  response: NextApiResponse
) {
  const result = await prisma.questionsRegistrations.findMany({
    include: {
      question: true,
      registration: {
        include: {
          student: true,
        },
      },
    },
  });

  return response.json(result);
}
