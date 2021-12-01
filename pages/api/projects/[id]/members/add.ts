import type { NextApiRequest, NextApiResponse } from 'next';
import type { ValidationError } from 'yup';
import { Role } from '@prisma/client';

import type Response from '../../../../../types/response';
import type Member from '../../../../../types/member';
import prisma from '../../../../../config/prisma';
import userInCookies from '../../../../../utils/user-in-cookies';
import addMemberSchema from '../../../../../validation/add-member-schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<{ member: Member }>>
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

    const data = await addMemberSchema.validate(req.body);

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
        message: 'Only the owner can add members.',
      });
    }

    const userToAdd = await prisma.user.findFirst({
      where: { username: data.username },
    });

    if (!userToAdd) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    const userOnProject = await prisma.usersOnProject.findFirst({
      where: {
        userId: userToAdd.id,
        projectId,
      },
    });

    if (userOnProject) {
      return res.status(400).json({
        message: 'User is already on this project.',
      });
    }

    const member = await prisma.usersOnProject.create({
      data: {
        userId: userToAdd.id,
        role: data.role as Role,
        projectId,
      },
      include: { user: { select: { id: true, name: true, username: true } } },
    });

    res.json({ data: { member } });
  } catch (error) {
    const err = error as ValidationError;
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }

    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
