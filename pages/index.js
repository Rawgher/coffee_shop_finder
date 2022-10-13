import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Card from '../components/card';
import { fetchCoffeeShops } from '../lib/coffee-shops';
import useTrackLocation from '../hooks/use-track-location';
import { useEffect, useState, useContext } from 'react';
import { ACTION_TYPES, StoreContext } from '../store/store-context';

export async function getStaticProps(context) {
  const coffeeShops = await fetchCoffeeShops();

  return {
    props: {coffeeShops}, 
  }
}

export default function Home(props) {

  const { handleTrackLocation, locationErrorMsg, isFindingLocation } = useTrackLocation();

  const [coffeeShopsError, setCoffeeShopsError] = useState(null);

  const { dispatch, state } = useContext(StoreContext);

  const { coffeeShops, latLong } = state;

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeShops = await fetch(`/api/getCoffeeShopsByLocation?latLong=${latLong}&limit=12`);
          const coffeeShops = await fetchedCoffeeShops.json();
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_SHOPS,
            payload: {
              coffeeShops: coffeeShops
            }
          });
          setCoffeeShopsError('');
        } catch(error) {
          setCoffeeShopsError(error.message);
        }
      }
    }
     
    setCoffeeStoresByLocation();
  },[latLong, dispatch]);

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText={isFindingLocation ? "Searching..." : "Find Shops"} handleOnClick={handleOnBannerBtnClick} />
        {locationErrorMsg && (<p>Something went wrong: {locationErrorMsg}</p>)}
        {coffeeShopsError && (<p>Something went wrong: {coffeeShopsError}</p>)}
        <div className={styles.heroImage}>
          <Image src='/static/hero-image.png' width={700} height={400} alt='hero image' />
        </div>

        {coffeeShops.length > 0 && 
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Shops Near You (10 mile radius)</h2>
            <div className={styles.cardLayout}>
              {coffeeShops.map(coffeeShop => {
                return <Card 
                  key={coffeeShop.id} 
                  name={coffeeShop.name} 
                  imgUrl={coffeeShop.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} 
                  href={`/coffee-shop/${coffeeShop.id}`} 
                  className={styles.card} 
                />
              })}
            </div>
          </div>
        }

        {props.coffeeShops.length > 0 && 
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Sacramento Coffee Shops</h2>
            <div className={styles.cardLayout}>
              {props.coffeeShops.map(coffeeShop => {
                return <Card 
                  key={coffeeShop.id} 
                  name={coffeeShop.name} 
                  imgUrl={coffeeShop.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} 
                  href={`/coffee-shop/${coffeeShop.id}`} 
                  className={styles.card} 
                />
              })}
            </div>
          </div>
        }
      </main>
    </div>
  )
}

