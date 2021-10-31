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
        const database = client.db("travelAnts");
        const tourPackagesCollection = database.collection("packages");
        const tourBookingCollection = database.collection("bookings");
        const blogsCollection = database.collection("blogs");

        //Post Package
        app.post('/addtourpackage', async (req, res) => {
            const packageData = req.body
            const result = await tourPackagesCollection.insertOne(packageData)
            res.send(result)
        })



        //Get Packages
        app.get('/showpackages', async (req, res) => {
            let ressult;

            if (req.query.find) {
                const pkg = req.query.find
                const pkgId = { _id: ObjectId(pkg) }
                result = await tourPackagesCollection.findOne(pkgId)
            } else if (req.query.type) {
                const packageData = tourPackagesCollection.find({}).sort({ _id: -1 })
                result = await packageData.limit(6).toArray()
            } else {
                const packageData = tourPackagesCollection.find({}).sort({ _id: -1 })
                result = await packageData.toArray()
            }
            res.send(result)
        })



        //Get Singel Package Data
        app.get('/packagedata/:pkg', async (req, res) => {
            const pkg = req.params.pkg
            const pkgId = { _id: ObjectId(pkg) }
            const result = await tourPackagesCollection.findOne(pkgId)
            res.send(result)
        })

        //Post Booking
        app.post('/newbooking', async (req, res) => {
            const bookingData = req.body
            const result = await tourBookingCollection.insertOne(bookingData)
            res.send(result)
        })

        //Get Packages
        app.get('/mybookings', async (req, res) => {
            let ressult;
            if (req.query.search) {
                const user = req.query.search
                const userEmail = { email: user }
                const userBookings = tourBookingCollection.find(userEmail)
                result = await userBookings.toArray()
            }
            else {
                const bookings = tourBookingCollection.find({})
                result = await bookings.toArray()
            }

            res.send(result)
        })

        //Chnage Status of Booking 
        app.put('/changestatus/:bkid', async (req, res) => {
            const bkId = req.params.bkid
            const bookingId = { _id: ObjectId(bkId) }
            const updateStatus = {
                $set: {
                    status: "approved"
                },
            };
            const result = await tourBookingCollection.updateOne(bookingId, updateStatus)
            res.send(result)
        })

        //Delete Booking 
        app.delete('/deletebooking/:bkid', async (req, res) => {
            const bkId = req.params.bkid
            console.log(bkId)
            const bookingId = { _id: ObjectId(bkId) }
            const result = await tourBookingCollection.deleteOne(bookingId)
            res.send(result)
        })

        //Post Package
        app.post('/addblog', async (req, res) => {
            const blogData = req.body
            const result = await blogsCollection.insertOne(blogData)
            res.send(result)
        })

        //Get Blogs
        app.get('/showblogs', async (req, res) => {
            //http://localhost:5000/showblogs?find

            let ressult;

            if (req.query.find) {
                const bgid = req.query.find
                const blogId = { _id: ObjectId(bgid) }
                result = await blogsCollection.findOne(blogId)
            } else if (req.query.type) {
                const bookings = blogsCollection.find({})
                result = await bookings.limit(4).toArray()
            } else {
                const bookings = blogsCollection.find({})
                result = await bookings.toArray()
            }

            res.send(result)
        })

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