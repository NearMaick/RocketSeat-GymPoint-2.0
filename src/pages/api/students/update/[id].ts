import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function Update(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query as any;
  const { name, email, age, height, weight } = request.body;

  const result = await prisma.students.update({
    where: {
      id: id,
    },
    data: {
      name,
      email,
      age,
      height,
      weight,
    },
  });

  return response.json(result);
}
