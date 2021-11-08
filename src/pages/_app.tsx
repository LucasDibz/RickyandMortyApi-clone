import '../styles/globals.scss';

import type { AppProps } from 'next/app';
import { CharactersProvider } from '../contexts/useCharacters';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CharactersProvider>
      <Component {...pageProps} />
    </CharactersProvider>
  );
}

export default MyApp;
