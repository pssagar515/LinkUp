const express=require('express');
const path = require('path');
const mongoose=require('mongoose');

const app=express();
const PORT=3000;

app.use(express.static(path.join(__dirname, 'public')));

//connect to MongoDb

mongoose.connect('mongodb://localhost:27017/my_database', {
}).then(()=>{
    console.log('connected to MongoDb');
}).catch((error)=>{
    console.log('Error connecting to mongoDb',error);
});

// middleware
app.use(express.json());

const Data=require('./server/models/data');

//Routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/data', async (req,res)=>{
    try{
        const data=await Data.find();
        res.json(data);
    }catch(error){
        console.error('error fetching data', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/data', async (req,res)=>{
    try{
        const newData=req.body;
        await Data.create(newData);
        res.send('Data Received succcessfully');
        // console.log(newData);
    }catch(error){
        console.error('error saving data', error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/data/:key', async (req, res) => {
    try {
        const key = req.params.key;
        const result = await Data.findOneAndDelete({ key: key });
        if (result) {
            res.send('Data deleted successfully');
        } else {
            res.status(404).send('Data not found');
        }
    } catch (error) {
        console.error('Error deleting data', error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/data/:key', async (req,res)=>{
    try{
        // console.log(req.body)
        const key=req.params.key;
        const value=req.body.value;
        let d = await Data.findOne({key: key});
        d.value = value;
        // console.log(d)

        await d.save();
        res.send('Data updated Successfully');
    }catch(error){
        console.error('error updating data', error);
        res.status(500).send('Internal Server Error');
    }
});


// Start Server

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});

