import Link from 'next/link';

import { Card } from '../Card';

import styles from './styles.module.scss';

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: {
    name: string;
  };
  firstSeen?: string;
  episode: string[];
};

interface StaticCharactersProps {
  characters: Character[];
  next: string | null;
  prev: string | null;
  pageIndex: number;
}

export function StaticCharacters({
  characters,
  next,
  prev,
  pageIndex,
}: StaticCharactersProps) {
  if (!characters)
    return (
      <div className={styles.loadingContainer}>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className={styles.container}>
      <nav>
        <Link href={`/characters/${pageIndex - 1}`} passHref>
          <button disabled={!prev}>Prev</button>
        </Link>
        <Link href={`/characters/${pageIndex + 1}`} passHref>
          <button disabled={!next}>Next</button>
        </Link>
      </nav>
      <div className={styles.cardsContainer}>
        {characters.map((character) => (
          <Card character={character} key={character.id} />
        ))}
      </div>
    </div>
  );
}
