import type { NextApiRequest, NextApiResponse } from 'next';
import type { ValidationError } from 'yup';
import { Role, Project } from '@prisma/client';

import type Response from '../../../types/response';
import prisma from '../../../config/prisma';
import userInCookies from '../../../utils/user-in-cookies';
import newProjectSchema from '../../../validation/new-project-schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<{ project: Project }>>
) {
  try {
    const user = await userInCookies(req.cookies);

    if (!user) {
      return res.status(401).json({
        message: 'You must be logged in to access projects.',
      });
    }

    const data = await newProjectSchema.validate(req.body);
    const project = await prisma.project.create({
      data: {
        ...data,
        ownerId: user.id,
        members: { create: [{ userId: user.id, role: Role.OWNER }] },
      },
    });

    res.status(201).json({ data: { project } });
  } catch (error) {
    const err = error as ValidationError;
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }

    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
