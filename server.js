'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
const PORT = process.env.PORT

mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', homepage);
function homepage(req, res) {
    res.send('This is home page');
}

const bookSchema = new mongoose.Schema({
    bookname: String,
    des: String,
    state: String,
    img: String,

})
const userSchema = new mongoose.Schema({
    Email: String,
    Books: [bookSchema],

})


const userSchemaModal = mongoose.model('user', userSchema);
const bookSchemaModal = mongoose.model('books', bookSchema);

function seedUserCollection() {
    const Omar = new userSchemaModal
        ({
            Email: 'omarzadyab@gmail.com',
            Books: [
                {
                    bookname: 'Omar Thiab',
                    des: 'dum14',
                    state: 'dum23',
                    img: 'dum32'
                }
            ]
        });

    const Victoria = new userSchemaModal
        ({
            Email: 'vzulof@gmail.com',
            Books: [
                {
                    bookname: 'Victoria',
                    des: 'dum1',
                    state: 'dum2',
                    img: 'dum3'
                }
            ]
        });
    Omar.save();
    Victoria.save();
}
// seedUserCollection();

app.get('/books', getBooks);
// /books?email=vzulof@gmail.com
function getBooks(req, res) 
{   let requestedEmail = req.query.email;
    console.log(requestedEmail);

    userSchemaModal.find({ Email: requestedEmail }, 
        function (err, bookData) 
        {
            if (err) { console.log('Oooops, something is wrong');}
            else {res.status(200).send(bookData[0].Books)};// Books is your object parameter that you want to render in front end (you dont need your email).  
            console.log(bookData[0]);
        }
        );
        
}


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})
