import Image from 'next/image';

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
};

interface CardProps {
  character: Character;
}

export function Card({ character }: CardProps) {
  const { name, image, species, status, location, firstSeen } = character;

  return (
    <div className={styles.characterCard}>
      <Image
        src={image}
        loader={() => image}
        alt='image'
        width={200}
        height={200}
        objectFit='cover'
        unoptimized
      />

      <div className={styles.charactersTexts}>
        <div>
          <p>{name}</p>
          <span>
            {status} - {species}
          </span>
        </div>

        <div>
          <span>Last known location: </span>
          <span>{location.name}</span>
        </div>

        <div>
          <span>First seen in: </span>
          <span>{firstSeen}</span>
        </div>
      </div>
    </div>
  );
}
