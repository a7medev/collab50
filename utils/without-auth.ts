import type { GetServerSideProps } from 'next';

interface Options {
  redirect?: string;
}

const withoutAuth = (
  { redirect = '/projects' }: Options = {},
  getServerSideProps?: GetServerSideProps
): GetServerSideProps => {
  return async (context) => {
    const { accessToken } = context.req.cookies;

    if (accessToken) {
      return { redirect: { destination: redirect, permanent: false } };
    }

    if (getServerSideProps) {
      const result = await getServerSideProps(context);

      return result;
    }

    return { props: {} };
  };
};

export default withoutAuth;
