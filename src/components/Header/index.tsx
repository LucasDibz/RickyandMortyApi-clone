import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';

export function Header() {
  return (
    <div className={styles.container}>
      <div>
        <Link href={'/'} passHref>
          <Image src='/assets/logo.svg' alt='logo' width={40} height={40} />
        </Link>
      </div>

      <div>
        <a href='https://rickandmortyapi.com/documentation'>Docs</a>
        <a href='https://rickandmortyapi.com/about'>About</a>
        <a href='https://rickandmortyapi.com/help-us'>HELP THEM</a>
      </div>
    </div>
  );
}
