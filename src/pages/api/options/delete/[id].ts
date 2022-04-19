import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function Update(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query as any;

  const result = await prisma.options.delete({
    where: {
      id: id,
    },
  });

  return response.json(result);
}
