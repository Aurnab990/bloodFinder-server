const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://newdata:hAC0Qp8JViZ7dFyn@cluster0.pg0uckr.mongodb.net/?retryWrites=true&w=majority';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      const itemsCollection = client.db('devhouse').collection('blood');
     
      // console.log("Pinged your deployment. You successfully connected to MongoDB!");
      app.get('/blood', async(req,res)=>{
        const query = {};
        const cursor = itemsCollection.find(query);
        const items = await cursor.toArray();
        res.send(items);
  
      });

      app.post('/blood', async(req, res) =>{
        console.log("Request", req.body);
        const newUser = req.body;
        const result = await itemsCollection.insertOne(newUser);
        res.send(result);
      });
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
      }
    }
    run().catch(console.dir);
    




app.get('/', (req, res) => {
    res.send("Server is running on my pc");
});
app.listen(port, () => {
    console.log(`Hello server connected on ${port}`);
});