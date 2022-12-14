import {table, findRecordByFilter, getMinifiedRecords} from "../../lib/airtable";
  
  const updateVotingById = async (req, res) => {
    if (req.method === "PUT") {
      try {
        const { id } = req.body;
  
        if (id) {
          const records = await findRecordByFilter(id);
  
          if (records.length !== 0) {
            const record = records[0];
  
            const increment = parseInt(record.voting) + 1;
            
            const updateRecord = await table.update([
              {
                id: record.recordId,
                fields: {
                  voting: increment,
                },
              },
            ]);
  
            if (updateRecord) {
              const minifiedRecords = getMinifiedRecords(updateRecord);
              res.json(minifiedRecords);
            }
          } else {
            res.json({ message: "Shop id doesn't exist", id });
          }
        } else {
          res.status(400);
          res.json({ message: "Id is missing" });
        }
      } catch (error) {
        res.status(500);
        res.json({ message: "Error upvoting coffee shop", error });
      }
    }
  };
  
  export default updateVotingById;