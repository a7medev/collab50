import type { ServerResponse } from 'http';
import { CookieSerializeOptions, serialize } from 'cookie';

const setCookie = (
  res: ServerResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  options.path ??= '/';

  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
};

export default setCookie;
