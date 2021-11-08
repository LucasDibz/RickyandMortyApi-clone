import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type CharactersProviderProps = {
  children: ReactNode;
};

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: {
    name: string;
  };
  episode: string[];
  firstSeen?: string;
};

type CharactersContextData = {
  characters?: Character[];
  prev?: string;
  next?: string;
  setURL: (url: string) => void;
};

type SWRResult = {
  results: Character[];
  info: {
    next: string | null;
    prev: string | null;
  };
};

const charactersContext = createContext({} as CharactersContextData);

export function CharactersProvider({ children }: CharactersProviderProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<SWRResult['info']>({
    next: null,
    prev: null,
  });
  const [url, setURL] = useState('https://rickandmortyapi.com/api/character');

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  useEffect(() => {
    async function loadCharacters() {
      let chars = [];

      const { info, results }: SWRResult = await fetcher(url);

      for await (const char of results) {
        const firstSeen = await fetcher(char.episode[0]);

        chars.push({
          ...char,
          firstSeen: firstSeen.name,
        });
      }

      setCharacters(chars);

      const infos: SWRResult['info'] = {
        next: info.next,
        prev: info.prev,
      };
      setInfo(infos);
    }

    loadCharacters();
  }, [url]);

  async function setFirstSeenInChars(characters: Character[]) {
    let chars: Character[] = [];
    for await (const char of characters) {
      const firstSeen = await fetcher(char.episode[0]);
      chars.push({
        ...char,
        firstSeen,
      });
    }

    setCharacters(chars);
  }

  const prev = info.prev ?? '';
  const next = info.next ?? '';

  return (
    <charactersContext.Provider value={{ characters, next, prev, setURL }}>
      {children}
    </charactersContext.Provider>
  );
}

export const useCharacters = () => useContext(charactersContext);
