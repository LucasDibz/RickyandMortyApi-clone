import useSWR from 'swr';

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

type SWRResult = {
  results: Character[];
  info: {
    next: string | null;
    prev: string | null;
  };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Since i have to do a double request for the first seen prop
 * i had to use the context api
 * but i'm keeping this as an example of SWR
 */
function useCharacters(url = 'https://rickandmortyapi.com/api/character') {
  const { data, error } = useSWR<SWRResult>(url, fetcher);

  return {
    characters: data?.results,
    isLoading: !error && !data,
    isError: error,
    nextPage: data?.info.next,
    prevPage: data?.info.prev,
  };
}
