import '../styles/global.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import fetcher from '../utils/fetcher';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
