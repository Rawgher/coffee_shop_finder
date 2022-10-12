import { table, getMinifiedRecords, findRecordByFilter, } from "../../lib/airtable";


const createCoffeeShop = async (req, res) => {

    if (req.method === "POST") {

        const { id, name, address, neighborhood, voting, imgUrl } = req.body;

        try {
            if (id) {
                const records = await findRecordByFilter(id);

                if (records.length !== 0) {
                    res.json(records);
                } else {
                    if (name) {
                        const createRecords = await table.create([
                            {
                            fields: {
                                id,
                                name,
                                address,
                                neighborhood,
                                voting,
                                imgUrl
                            }
                            },
                        ]);
                        
                        const record = res.json(getMinifiedRecords(createRecords));
                        res.json(record);
                    } else {
                        res.status(400);
                        res.json({ message: "Shop name is missing" });
                    }
                }
            } else {
                res.status(400);
                res.json({ message: "Id is missing" });
            }
        } catch (err) {
            res.status(500);
            res.json({ message: 'Error creating or finding shop', err });
        }
    } 
}

export default createCoffeeShop;