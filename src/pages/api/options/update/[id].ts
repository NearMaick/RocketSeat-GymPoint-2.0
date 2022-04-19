import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function Update(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query as any;
  const { title, month, value } = request.body;

  const result = await prisma.options.update({
    where: {
      id: id,
    },
    data: {
      title,
      month,
      value,
    },
  });

  return response.json(result);
}
