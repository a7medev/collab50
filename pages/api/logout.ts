import type { NextApiRequest, NextApiResponse } from 'next';

import setCookie from '../../utils/set-cookie';

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  setCookie(res, 'accessToken', '', { maxAge: -1, httpOnly: true });
  res.json({ message: 'Logged out' });
}
