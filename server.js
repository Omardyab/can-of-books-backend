'use strict'

require('dotenv').config();
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose'); 

const app=express();
app.use(cors());
const PORT =process.env.PORT 

mongoose.connect('mongodb://localhost:27017/cats', {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/',homepage);
function homepage(req,res){
    res.send('this is home page');
    }

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})


