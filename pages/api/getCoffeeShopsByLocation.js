import { fetchLatLongCoffeeShops } from "../../lib/coffee-shops";

const getCoffeeShopsByLocation = async (req, res) => {
    try {
        const { latLong } = req.query;
        const response = await fetchLatLongCoffeeShops(latLong);
        res.status(200);
        res.json(response);
    } catch (err) {
        console.error('Error found', err);
        res.status(500);
        res.json({ message: "Something went wrong", err });
    }
}

export default getCoffeeShopsByLocation;