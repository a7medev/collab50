import type { GetServerSideProps } from 'next';

import setCookie from './set-cookie';
import userInCookies from './user-in-cookies';

const withAuth = (
  getServerSideProps?: GetServerSideProps
): GetServerSideProps => {
  return async (context) => {
    const user = await userInCookies(context.req.cookies);

    if (!user) {
      setCookie(context.res, 'accessToken', '', { maxAge: -1 });

      return {
        redirect: { destination: '/login', permanent: false },
      };
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
