import { MeRepository } from 'lib';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt';

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { name },
    method,
  } = req
  const token = await getToken({req})
  switch (method) {
    case 'PUT':
      if(!token?.email) return res.status(401).end(`Not Authorized`)
      const repo = await MeRepository.get(token.email);
      await repo.update({name});
      res.status(200).end()
    break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}