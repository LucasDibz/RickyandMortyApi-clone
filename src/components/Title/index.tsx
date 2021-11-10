import Image from 'next/image';

import styles from './styles.module.scss';

export function Title() {
  return (
    <div className={styles.container}>
      <h1>The Rick and Morty API</h1>
      <div>
        <Image
          src='/assets/heroes.svg'
          width={200}
          height={200}
          alt='Ricky and Morty'
          className={styles.heroes}
        />
      </div>
    </div>
  );
}
