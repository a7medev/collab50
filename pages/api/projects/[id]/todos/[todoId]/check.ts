import { Role } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ValidationError } from 'yup';

import prisma from '../../../../../../config/prisma';
import userInCookies from '../../../../../../utils/user-in-cookies';
import checkTodoSchema from '../../../../../../validation/check-todo-schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await userInCookies(req.cookies);

    if (!user) {
      return res.status(401).json({
        message: 'You must be logged in to add todos.',
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

    const data = await checkTodoSchema.validate(req.body);

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

    if (project.role !== Role.OWNER && project.role !== Role.EDITOR) {
      return res.status(403).json({
        message: 'Only the owner and editors can add todos.',
      });
    }

    const result = await prisma.todo.updateMany({
      where: {
        id: todoId,
        projectId,
      },
      data,
    });

    if (!result.count) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({
      message: `${data.completed ? 'Checked' : 'Unchecked'} todo successfully`,
    });
  } catch (error) {
    const err = error as ValidationError;
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }

    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
