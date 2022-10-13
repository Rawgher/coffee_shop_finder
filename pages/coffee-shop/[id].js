import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import cls from 'classnames'
import useSWR from "swr";
import styles from '../../styles/coffee-shop.module.css';
import { fetchCoffeeShops } from '../../lib/coffee-shops';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/store-context';
import { fetcher, isEmpty } from '../../utils';


export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    const coffeeShops = await fetchCoffeeShops();
    const findCoffeeShopsById = coffeeShops.find(coffeeShop => {
        return coffeeShop.id.toString() === params.id;
    });

    return {
      props: { coffeeShop:  findCoffeeShopsById ? findCoffeeShopsById : {}},
    }
}

export async function getStaticPaths() {
    const coffeeShops = await fetchCoffeeShops();
    const paths = coffeeShops.map(coffeeShop => {
        return {
            params: {id: coffeeShop.id.toString()},
        };
    });
    return {
      paths,
      fallback: true, 
    };
}

const CoffeeShop = (intitalProps) => {

    const router = useRouter();

    const id = router.query.id;

    const [coffeeShop, setCoffeeShop] = useState(intitalProps.coffeeShop);

    const { state: { coffeeShops } } = useContext(StoreContext);

    const handleCreateCoffeeShop = async (coffeeShop) => {
        try {
            const { id, name, address, neighborhood, voting, imgUrl } = coffeeShop;
            const response = await fetch('/api/createCoffeeShop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ 
                    id, 
                    name, 
                    address: address || '', 
                    neighborhood: neighborhood || '',
                    voting: 0, 
                    imgUrl 
                }),
            });
            const dbCoffeeShop = response.json;
        } catch (err) {
            console.err('Error creating coffee shop', err);
        }
    }

    useEffect(() => {
        if (isEmpty(intitalProps.coffeeShop)) {
            if (coffeeShops.length > 0) {
                const coffeeShopFromContext = coffeeShops.find(coffeeShop => {
                    return coffeeShop.id.toString() === id;
                });

                if (coffeeShopFromContext) {
                    setCoffeeShop(coffeeShopFromContext);
                    handleCreateCoffeeShop(coffeeShopFromContext);
                }
            }
        } else {
            handleCreateCoffeeShop(intitalProps.coffeeShop);
        }
    }, [id, intitalProps, intitalProps.coffeeShop, coffeeShops]);

    const { address, neighborhood, name, imgUrl } = coffeeShop;

    const [votingCount, setVotingCount] = useState(0);

    const { data, error } = useSWR(`/api/getCoffeeShopById?id=${id}`, fetcher);

    useEffect(() => {
        if (data && data.length > 0) {
            setCoffeeShop(data[0]);
            setVotingCount(data[0].voting);
        }
    }, [data]);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const handleUpvoteButton = async () => {
        try {
            const response = await fetch("/api/updateVotingById", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                }),
            });
    
            const dbCoffeeShop = await response.json();
    
            if (dbCoffeeShop && dbCoffeeShop.length > 0) {
                let count = votingCount + 1;
                setVotingCount(count);
            }
        } catch (err) {
            console.error("Error upvoting coffee shop", err);
        }
     };

    if (error) {
        return <div>Something went wrong while retreiving shop page</div>
    }

    return (
        
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">
                            <a>← Back to Home</a>
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image src={imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                        width={600} height={360} className={styles.storeImg} alt={name} />
                </div>
                <div className={cls("glass", styles.col2)}>
                    {address && (
                        <div className={styles.iconWrapper}>
                            <Image src="/static/icons/pin.svg" width="28" height="28" alt='address svg' />
                            <p className={styles.text}>{address}</p>
                        </div>
                    )}
                    {neighborhood && (
                        <div className={styles.iconWrapper}>
                            <Image src="/static/icons/city.svg" width="28" height="28"  alt='neighborhood svg' />
                            <p className={styles.text}>{neighborhood}</p>
                        </div>
                    )}
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width="28" height="28" alt='voting svg' />
                        <p className={styles.rating}>{votingCount}</p>
                    </div>

                    <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Upvote</button>
                </div>
            </div>
        </div>
    )
}

export default CoffeeShop;