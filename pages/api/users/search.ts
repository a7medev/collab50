import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../config/prisma';
import userInCookies from '../../../utils/user-in-cookies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await userInCookies(req.cookies);

  if (!user) {
    return res.status(401).json({
      message: 'You must be logged in to search users.',
    });
  }

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
      id: { not: user.id },
    },
  });

  res.setHeader('Cache-Control', 'max-age=300, s-maxage=300');

  return res.json({ data: { users } });
}
