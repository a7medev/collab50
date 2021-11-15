import type { ErrorResponse } from '../types/response';

export class FetchError<R = ErrorResponse> extends Error {
  public readonly name = 'FetchError';

  constructor(public readonly status: number, public readonly info: R) {
    super(`Request failed with status ${status}`);
  }
}

const fetcher = async (url: string) => {
  const res = await fetch(url, { credentials: 'include' });

  if (!res.ok) {
    if (res.headers.get('Content-Type')?.includes('application/json')) {
      const info = await res.json();
      throw new FetchError(res.status, info);
    }

    throw new FetchError(res.status, {});
  }

  const data = await res.json();

  return data;
};

export default fetcher;
