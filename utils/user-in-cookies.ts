import jwt from 'jsonwebtoken';

import prisma from '../config/prisma';

const userInCookies = async (cookies: { [key: string]: string }) => {
  const { accessToken } = cookies;

  if (!accessToken) {
    return null;
  }

  const { userId } = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET!
  ) as { userId: string };

  const user = await prisma.user.findFirst({
    where: { id: parseInt(userId) },
    select: { id: true, name: true, username: true },
  });

  return user;
};

export default userInCookies;
