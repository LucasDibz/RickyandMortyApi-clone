import Image from 'next/image';

import styles from './styles.module.scss';

export function Header() {
  return (
    <div className={styles.container}>
      <div>
        <Image src='/assets/logo.svg' alt='logo' width={40} height={40} />
      </div>

      <div>
        <a href=''>Docs</a>
        <a href=''>About</a>
        <a href=''>HELP US</a>
      </div>
    </div>
  );
}
