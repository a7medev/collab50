import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../config/prisma';
import userInCookies from '../../../../utils/user-in-cookies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await userInCookies(req.cookies);

  if (!user) {
    return res.status(401).json({
      message: 'You must be logged in to access projects.',
    });
  }

  const projectId = +req.query.id;

  if (isNaN(projectId) || projectId < 0) {
    return res.status(400).json({
      message: 'Invalid project ID',
    });
  }

  const project = await prisma.usersOnProject.findFirst({
    where: {
      projectId,
      userId: user.id,
    },
    include: {
      project: {
        include: {
          todos: { orderBy: { id: 'asc' } },
          members: {
            include: {
              user: { select: { id: true, name: true, username: true } },
            },
          },
        },
      },
    },
  });

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  res.json({ data: { project } });
}
