import type { GetServerSideProps } from 'next';

import userInCookies from './user-in-cookies';

const withAuth = (
  getServerSideProps?: GetServerSideProps
): GetServerSideProps => {
  return async (context) => {
    const user = await userInCookies(context.req.cookies);

    if (!user) {
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
