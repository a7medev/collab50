import type { NextApiRequest, NextApiResponse } from 'next';
import type { ValidationError } from 'yup';
import { Role, Todo } from '@prisma/client';

import type Response from '../../../../../types/response';
import prisma from '../../../../../config/prisma';
import userInCookies from '../../../../../utils/user-in-cookies';
import newTodoSchema from '../../../../../validation/new-todo-schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<{ todo: Todo }>>
) {
  try {
    const user = await userInCookies(req.cookies);

    if (!user) {
      return res.status(401).json({
        message: 'You must be logged in to add todos.',
      });
    }

    const projectId = +req.query.id;

    if (isNaN(projectId) || projectId < 0) {
      return res.status(400).json({
        message: 'Invalid project ID',
      });
    }

    const data = await newTodoSchema.validate(req.body);

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

    const todo = await prisma.todo.create({
      data: {
        ...data,
        projectId,
      },
    });

    res.json({ data: { todo } });
  } catch (error) {
    const err = error as ValidationError;
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }

    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
