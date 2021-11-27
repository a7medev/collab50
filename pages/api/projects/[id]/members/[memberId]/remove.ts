import type { NextApiRequest, NextApiResponse } from 'next';
import { Role } from '@prisma/client';

import prisma from '../../../../../../config/prisma';
import userInCookies from '../../../../../../utils/user-in-cookies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await userInCookies(req.cookies);

    if (!user) {
      return res.status(401).json({
        message: 'You must be logged in to add members.',
      });
    }

    const projectId = +req.query.id;

    if (isNaN(projectId) || projectId < 0) {
      return res.status(400).json({
        message: 'Invalid project ID',
      });
    }

    const memberId = +req.query.memberId;

    if (isNaN(memberId) || memberId < 0) {
      return res.status(400).json({
        message: 'Invalid member ID',
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

    if (project.role !== Role.OWNER && memberId !== user.id) {
      return res.status(403).json({
        message: 'Only the owner can remove other members.',
      });
    }

    const result = await prisma.usersOnProject.deleteMany({
      where: {
        userId: memberId,
        projectId,
      },
    });

    if (!result.count) {
      return res.status(404).json({ message: 'Member not found.' });
    }

    res.json({ message: 'Deleted member successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
