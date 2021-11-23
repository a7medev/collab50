import type { NextApiRequest, NextApiResponse } from 'next';
import { Role } from '@prisma/client';

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
    select: { id: true, role: true },
  });

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (project.role !== Role.OWNER) {
    return res.status(403).json({
      message: 'Only the owner and editors can add todos.',
    });
  }

  const deleted = await prisma.project.delete({
    where: { id: projectId },
  });

  if (!deleted) {
    return res.status(404).json({ message: "Couldn't delete the project" });
  }

  res.json({ message: 'Deleted project successfully' });
}
