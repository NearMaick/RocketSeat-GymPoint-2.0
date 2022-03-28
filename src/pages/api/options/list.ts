import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function OptionsList(
  _request: NextApiRequest,
  response: NextApiResponse
) {
  const result = await prisma.options.findMany();
  return response.json(result);
}
