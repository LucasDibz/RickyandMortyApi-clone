import type { NextPage } from 'next';

import { Characters } from '../components/Characters';
import { Header } from '../components/Header';
import { Title } from '../components/Title';

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <Title />
      <Characters />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
