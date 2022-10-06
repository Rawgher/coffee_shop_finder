import { useRouter } from "next/router";
import Link from 'next/link';
import Head from "next/head";
import coffeeShopsData from '../../data/coffee-stores.json';

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    return {
      // Passed to the page component as props
      props: { coffeeShop:  coffeeShopsData.find(coffeeShop => {
        return coffeeShop.id.toString() === params.id;
      }) },
    }
}

export async function getStaticPaths() {
    const paths = coffeeShopsData.map(coffeeShop => {
        return {
            params: {id: coffeeShop.id.toString()},
        };
    });
    return {
      paths,
      fallback: true, 
    };
}

const CoffeeShop = (props) => {

    const router = useRouter();
    console.log(router);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const {address, name, neighbourhood } = props.coffeeShop;

    return (
        <div>
            <Head>
                <title>{name}</title>
            </Head>
            <Link href="/">
                <a>Back to Home</a>
            </Link>
            <p>{address}</p>
            <p>{name}</p>
            <p>{neighbourhood}</p>
        </div>
    )
}

export default CoffeeShop;