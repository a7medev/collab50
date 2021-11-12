import type { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import prisma from '../../config/prisma';
import setCookie from '../../utils/set-cookie';

const userSchema = Yup.object({
  name: Yup.string().label('Name').trim().min(2).max(50).required(),
  username: Yup.string()
    .label('Username')
    .trim()
    .lowercase()
    .min(3)
    .max(30)
    .required(),
  password: Yup.string().label('Password').min(8).required(),
}).required();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await userSchema.validate(req.body);

    const usernameExists = await prisma.user.findFirst({
      where: { username: data.username },
      select: { username: true },
    });

    if (usernameExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
    });

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
