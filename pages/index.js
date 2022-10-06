import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Card from '../components/card';
import coffeeShopsData from '../data/coffee-stores.json';

export async function getStaticProps(context) {

  return {
    props: {coffeeShops: coffeeShopsData}, 
  }

}

export default function Home(props) {

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
        {props.coffeeShops.length > 0 && 
        <>
          <h2 className={styles.heading2}>Sacramento Coffee Shops</h2>
          <div className={styles.cardLayout}>
            {props.coffeeShops.map(coffeeShop => {
              return <Card name={coffeeShop.name} imgUrl={coffeeShop.imgUrl} href={`/coffee-shop/${coffeeShop.id}`} className={styles.card} key={coffeeShop.id} />
            })}
          </div>
        </>}
      </main>
    </div>
  )
}

