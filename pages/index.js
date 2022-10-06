import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Card from '../components/card';
import coffeeShopsData from '../data/coffee-stores.json';

export async function getStaticProps(context) {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ''
    }
  };
  
  const response = await fetch('https://api.foursquare.com/v3/places/search?query=coffee%20shop&near=Sacramento%2C%20CA&limit=6', options);

  const data = await response.json();
  
    // .catch(err => console.error(err));

  return {
    props: {coffeeShops: data.results}, 
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
              return <Card key={coffeeShop.fsq_id} name={coffeeShop.name} imgUrl={coffeeShop.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} href={`/coffee-shop/${coffeeShop.id}`} className={styles.card} />
            })}
          </div>
        </>}
      </main>
    </div>
  )
}

