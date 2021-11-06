import type { NextPage } from 'next';

import { Characters } from '../components/Characters';
import { Header } from '../components/Header';

import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <h1>The Rick and Morty API</h1>
      <Characters />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
