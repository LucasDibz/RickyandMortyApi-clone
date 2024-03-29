import { useCharacters } from '../../contexts/useCharacters';

import { Card } from '../Card';

import styles from './styles.module.scss';

export function Characters() {
  const { characters, next, prev, setURL } = useCharacters();

  if (!characters)
    return (
      <div className={styles.loadingContainer}>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className={styles.container}>
      <nav>
        <button onClick={() => prev && setURL(prev)} disabled={!prev}>
          Prev
        </button>
        <button onClick={() => next && setURL(next)} disabled={!next}>
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
