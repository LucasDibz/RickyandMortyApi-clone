import { useState } from 'react';
import Link from 'next/link';

import { useCharacters } from '../../hooks/useCharacters';
import { Card } from '../Card';

import styles from './styles.module.scss';

export function Characters() {
  const [pageIndex, SetPageIndex] = useState(1);
  const { characters, next, prev } = useCharacters(pageIndex);

  if (!characters)
    return (
      <div className={styles.loadingContainer}>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className={styles.container}>
      <nav>
        <button onClick={() => SetPageIndex(pageIndex - 1)} disabled={!prev}>
          Prev
        </button>
        <button onClick={() => SetPageIndex(pageIndex + 1)} disabled={!next}>
          Next
        </button>
      </nav>
      <div className={styles.cardsContainer}>
        {characters.map((character) => (
          <Card character={character} key={character.id} />
        ))}
      </div>
    </div>
  );
}
