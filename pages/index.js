import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Card from '../components/card';

export default function Home() {

  const handleOnBannerBtnClick = () => {
    console.log('clicked');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText="Find Shops" handleOnClick={handleOnBannerBtnClick} />
        <div className={styles.heroImage}>
          <Image src='/static/hero-image.png' width={700} height={400} alt='hero image' />
        </div>
        <div className={styles.cardLayout}>
          <Card name="darkhorse coffee" imgUrl="/static/hero-image.png" href="/coffee-shop/darkhorse-coffee" className={styles.card} />
        </div>
      </main>
    </div>
  )
}
