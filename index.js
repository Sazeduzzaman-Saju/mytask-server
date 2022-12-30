const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config()

//middleware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kystxht.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)



async function run() {
    try {
        const taskCollection = client.db('myTask').collection('allTask');
        const importantCollection = client.db('myTask').collection('importantTask');
        const completeCollection = client.db('myTask').collection('completeTask');

        // post data
        app.post('/alltask', async (req, res) => {
            const data = req.body;
            const result = await taskCollection.insertOne(data)
            res.send(result)
        })
        // get All review Data With query 
        app.get('/mytask', async (req, res) => {
            let query = {}
            console.log(req.query.email)
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = taskCollection.find(query)
            const result = await cursor.toArray();
            res.send(result)
        })


        //get data
        app.get('/alltask', async (req, res) => {
            const query = {}
            const cursor = taskCollection.find(query);
            const categories = await cursor.toArray();
            res.send(categories)
        })
        // get All review Data With query 
        app.delete('/alltask/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await taskCollection.deleteOne(query);
            console.log(result)
            res.send(result)
        })
        // get All review Data With query 
        app.get('/alltask/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) }
            const result = await taskCollection.find(query).toArray();
            console.log(result)
            res.send(result);
        })

        //get data
        app.get('/important', async (req, res) => {
            const query = {}
            const cursor = importantCollection.find(query);
            const categories = await cursor.toArray();
            res.send(categories)
        })
        // get All review Data With query 
        app.get('/myimportant', async (req, res) => {
            let query = {}
            console.log(req.query.email)
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = importantCollection.find(query)
            const result = await cursor.toArray();
            res.send(result)
        })
        // post data
        app.post('/important', async (req, res) => {
            const data = req.body;
            console.log(data)
            const result = await importantCollection.insertOne(data);
            console.log(result)
            res.send(result)
        })
        // get All review Data With query 
        app.get('/important/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) }
            const result = await importantCollection.find(query).toArray();
            console.log(result)
            res.send(result);
        })
        // get All review Data With query 
        app.delete('/important/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await importantCollection.deleteOne(query);
            console.log(result)
            res.send(result)
        })

        // post data
        app.post('/complete', async (req, res) => {
            const data = req.body;
            console.log(data)
            const result = await completeCollection.insertOne(data);
            console.log(result)
            res.send(result)
        })
        // get All review Data With query 
        app.get('/complete', async (req, res) => {
            const query = {}
            const cursor = completeCollection.find(query);
            const categories = await cursor.toArray();
            res.send(categories)
        })
        // get All review Data With query 
        app.get('/mycomplete', async (req, res) => {
            let query = {}
            console.log(req.query.email)
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = completeCollection.find(query)
            const result = await cursor.toArray();
            res.send(result)
        })
        // get All review Data With query 
        app.delete('/complete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await completeCollection.deleteOne(query);
            console.log(result)
            res.send(result)
        })

        // get All review Data With query 
        app.get('/usertask', async (req, res) => {
            let query = {}
            console.log(req.query.email)
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query)
            const review = await cursor.toArray();
            res.send(review)
        })
        // get All review Data With query 
        app.put('/complete/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    postStatus: 'complete'
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })
        // get All review Data With query 
        app.put('/important/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    postStatus: 'important'
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

    }
    finally {

    }

}
run().catch(error => console.error(error))


app.get('/', (req, res) => {
    res.send('MyTask Backend Ready ')
})

app.listen(port, () => {
    console.log(`MyTask Backend Running in ${port}`)
})