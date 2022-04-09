import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function CreateOption(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { title, month, value } = request.body;

  const result = await prisma.options.create({
    data: {
      title,
      month: Number(month),
      value: Number(value),
    },
  });

  return response.status(201).json(result);
}
