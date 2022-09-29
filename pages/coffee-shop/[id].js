import { useRouter } from "next/router";
import Link from 'next/link';

const CoffeeShop = () => {

    const router = useRouter();
    console.log(router)

    return (
        <div>
            <Link href="/">
                <a>Back to Home</a>
            </Link>

            <h1>Single Coffee Shop Page {router.query.id}</h1>
        </div>
    )
}

export default CoffeeShop;