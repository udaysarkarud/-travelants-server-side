const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 5000;

//midelware
app.use(cors());
app.use(express.json());

//DB Connection
const uri = `mongodb+srv://${process.env.MONG_DB_USER}:${process.env.MONG_DB_PASS}@cluster0.x6o4r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const main = async () => {
    try {
        await client.connect();
        // const database = client.db("volnetDb");
        // const eventsCollection = database.collection("eventsColl");
        // const volRegCollection = database.collection("volRegColl");
        console.log('connected')






    }
    finally {

    }
}

main().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`listening Port:${port}`)
})