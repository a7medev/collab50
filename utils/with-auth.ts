import type { GetServerSideProps } from 'next';
import jwt from 'jsonwebtoken';

import prisma from '../config/prisma';

const noAuthResult = {
  redirect: { destination: '/login', permanent: false },
};

const withAuth = (
  getServerSideProps?: GetServerSideProps
): GetServerSideProps => {
  return async (context) => {
    const { accessToken } = context.req.cookies;

    if (!accessToken) {
      return noAuthResult;
    }

    const { userId } = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as { userId: string };

    const user = await prisma.user.findFirst({
      where: { id: parseInt(userId) },
      select: { id: true, name: true, username: true },
    });

    if (!user) {
      return noAuthResult;
    }

    if (getServerSideProps) {
      const result = await getServerSideProps(context);

      if ('props' in result) {
        return { props: { ...result.props, user } };
      }

      return result;
    }

    return { props: { user } };
  };
};

export default withAuth;
