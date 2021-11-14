import type { NextApiRequest, NextApiResponse } from 'next';
import type { UsersOnProject } from '@prisma/client';

import prisma from '../../../config/prisma';
import Response from '../../../types/response';
import userInCookies from '../../../utils/user-in-cookies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<{ projects: UsersOnProject[] }>>
) {
  const user = await userInCookies(req.cookies);

  if (!user) {
    return res.status(401).json({
      message: 'You must be logged in to access projects.',
    });
  }

  const projects = await prisma.usersOnProject.findMany({
    where: { userId: user.id },
    include: { project: true },
  });

  res.json({ data: { projects } });
}
