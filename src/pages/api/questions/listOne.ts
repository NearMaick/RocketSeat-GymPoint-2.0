import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function QuestionListOne(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query as any;
  const result = await prisma.questions.findUnique({
    where: {
      id,
    },
  });

  return response.status(201).json(result);
}
