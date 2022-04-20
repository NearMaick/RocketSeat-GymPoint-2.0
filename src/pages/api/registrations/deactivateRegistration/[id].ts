import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function Update(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query as any;
  const { is_active } = request.body;

  const result = await prisma.registrations.update({
    where: {
      id: id,
    },
    data: {
      is_active,
    },
  });

  return response.json(result);
}
