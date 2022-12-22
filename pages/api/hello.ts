import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { stringify } from "superjson";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json(stringify({ toke: await getToken({ req }) }));
}
