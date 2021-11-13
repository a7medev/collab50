import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '@prisma/client';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import type Response from '../../types/response';
import prisma from '../../config/prisma';
import setCookie from '../../utils/set-cookie';
import loginSchema from '../../validation/login-schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    Response<{ user: Omit<User, 'password'>; accessToken: string }>
  >
) {
  try {
    const data = await loginSchema.validate(req.body);

    const user = await prisma.user.findFirst({
      where: { username: data.username },
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid username or password',
      });
    }

    const passwordsMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordsMatch) {
      return res.status(401).json({
        message: 'Invalid username or password',
      });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '7d' }
    );

    setCookie(res, 'accessToken', accessToken, { httpOnly: true });

    res.status(201).json({
      data: {
        user: { id: user.id, name: user.name, username: user.username },
        accessToken,
      },
    });
  } catch (error) {
    const err = error as Yup.ValidationError;
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }

    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
