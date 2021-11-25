import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../config/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query.q;

  if (typeof query !== 'string' || !query.trim()) {
    return res.json({ data: { users: [] } });
  }

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { username: { contains: query, mode: 'insensitive' } },
      ],
    },
  });

  res.setHeader('Cache-Control', 'max-age=300, s-maxage=300');

  return res.json({ data: { users } });
}
