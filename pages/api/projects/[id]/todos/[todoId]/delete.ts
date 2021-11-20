import { Role } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ValidationError } from 'yup';

import prisma from '../../../../../../config/prisma';
import userInCookies from '../../../../../../utils/user-in-cookies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await userInCookies(req.cookies);

  if (!user) {
    return res.status(401).json({
      message: 'You must be logged in to delete todos.',
    });
  }

  const projectId = +req.query.id;
  const todoId = +req.query.todoId;

  if (isNaN(projectId) || projectId < 0) {
    return res.status(400).json({
      message: 'Invalid project ID',
    });
  }

  if (isNaN(todoId) || todoId < 0) {
    return res.status(400).json({
      message: 'Invalid todo ID',
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
      message: 'Only the owner can delete todos.',
    });
  }

  const result = await prisma.todo.deleteMany({
    where: {
      id: todoId,
      projectId,
    },
  });

  if (!result.count) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json({
    message: 'Deleted todo successfully',
  });
}
