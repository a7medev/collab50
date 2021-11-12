import type { NextApiRequest, NextApiResponse } from 'next';

import setCookie from '../../utils/set-cookie';

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  setCookie(res, 'token', '', { maxAge: -1 });
  res.json({ message: 'Logged out' });
}
