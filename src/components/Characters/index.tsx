import { Card } from '../Card';

import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

type Character = {
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

export function Characters() {
  const [characters, SetCharacters] = useState<Character[]>([]);

  useEffect(() => {
    async function loadChar() {
      const data = await fetch('https://rickandmortyapi.com/api/character');
      const { results }: { results: Character[] } = await data.json();

      let chars = [];
      for await (const character of results) {
        const data = await fetch(character.episode[0]);
        const { name: firstSeen } = await data.json();

        chars.push({
          firstSeen,
          ...character,
        });
      }

      SetCharacters(chars);
    }
    loadChar();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        {characters.map((character) => (
          <Card character={character} key={character.name} />
        ))}
      </div>
    </div>
  );
}
