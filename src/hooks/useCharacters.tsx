import useSWR from 'swr';

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

type SWRResult = {
  results: Character[];
  info: {
    next: string | null;
    prev: string | null;
  };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCharacters(pageIndex: number) {
  const { data } = useSWR<SWRResult>(
    `https://rickandmortyapi.com/api/character?page=${pageIndex}`,
    fetcher,
  );

  return {
    characters: data?.results,
    prev: data?.info.prev,
    next: data?.info.next,
  };
}
