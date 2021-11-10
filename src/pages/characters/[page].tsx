import { ParsedUrlQuery } from 'querystring';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

import { Header } from '../../components/Header';
import { StaticCharacters } from '../../components/StaticCharacters';
import { Title } from '../../components/Title';

type SWRResult = {
  results: Character[];
  info: {
    next: string | null;
    prev: string | null;
  };
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
  firstSeen?: string;
  episode: string[];
};

interface SSGCharactersProps {
  characters: Character[];
  next: string | null;
  prev: string | null;
  pageIndex: number;
}

interface Params extends ParsedUrlQuery {
  page: string;
}

export const getStaticProps: GetStaticProps<SSGCharactersProps, Params> =
  async (context) => {
    const params = context.params!;
    const { page } = params;

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const data: SWRResult = await fetcher(
      `https://rickandmortyapi.com/api/character/?page=${page}`,
    );

    if (!data) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    // Generate firstSeen prop with Promise.all

    // const promiseArray = data.results.map(async (character) => {
    //   const firstSeen = await fetcher(character.episode[0]);

    //   return {
    //     ...character,
    //     firstSeen: firstSeen.name,
    //   };
    // });
    // const characters = await Promise.all(promiseArray);

    // OR with for await as below
    let characters: Character[] = [];
    for await (const character of data.results) {
      const firstSeen = await fetcher(character.episode[0]);
      characters.push({
        ...character,
        firstSeen: firstSeen.name,
      });
    }

    const props = {
      characters,
      next: data.info.next,
      prev: data.info.prev,
      pageIndex: Number(page),
    };

    return {
      props,
    };
  };

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { page: '1' },
      },
      {
        params: { page: '2' },
      },
    ],
    fallback: 'blocking',
  };
};

const SSGCharacters = ({
  characters,
  next,
  prev,
  pageIndex,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Header />
      <Title />
      <StaticCharacters
        characters={characters}
        next={next}
        prev={prev}
        pageIndex={pageIndex}
      />
      {/* <Footer /> */}
    </div>
  );
};

export default SSGCharacters;
