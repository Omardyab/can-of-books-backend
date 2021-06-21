'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
const PORT = process.env.PORT

mongoose.connect('mongodb://localhost:27017/book', { useNewUrlParser: true, useUnifiedTopology: true });


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
const bookSchemaModal = mongoose.model('book', bookSchema);

function seedUserCollection() {
    const Victoria = new userSchemaModal
        ({
            Email: "vzulof@gmail.com",
            Books: [
                   {bookname: "Clean Code",
                    des: "Clean Code by Robert C. Martin (aka Uncle Bob) is a classic book every software engineer and programmer should read. It teaches you how to write code in a way that's easy to read and understand.",
                    state: "To read on 1st sep.",
                    img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1436202607l/3735293._SX318_.jpg"},
    
                   { bookname: "N. K. JEMISIN, THE FIFTH SEASON (2015)",
                   des: "At the end of the world, a woman must hide her secret power and find her kidnapped daughter in this (intricate and extraordinary) Hugo Award winning novel of power, oppression, and revolution. (The New York Times)",
                   state: " Just done reading",
                   img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386803701l/19161852.jpg"},
    
                    {bookname: "The Clean Coder",
                    des: "This is another great book from Robert C. Martin, the author of Clean Code.The main topic of this book is how professional software developers should behave, incluing how they should communicate and work on projects or solve problems.",
                     state: "Was read twice",
                     img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347470803l/10284614.jpg"}
            ]
        });
        const Omar = new userSchemaModal ({
            Email: "omarzadyab@gmail.com",
            Books: [
                   {bookname: "The Pragmatic Programmer",
                   des: "The Pragmatic Programmer by Andrew Hunt and David Thomas is another classic every software engineer should read. A true (oldie but goldie)" ,
                   state: "To read on 1st aug.",
                   img: "https://images-na.ssl-images-amazon.com/images/I/41as+WafrFL.jpg"},
    
                   { bookname: "Refactoring",
                   des: "Code gets messy over time. That's just a circumstance we cannot change. But what we can change is the complexity of our codebase through refactoring.The classic Refactoring by Martin Fowler and Kent Beck will show you how you can identify bloated code, and how you can work your way through the old, entangled codebase to a new shiny, refactored one.The books is old, but still a classic. The examples are Java heavy but can be applied to other codebases, as well.",
                   state: " Just done reading",
                   img: "https://rukminim1.flixcart.com/image/416/416/book/6/6/7/refactoring-improving-the-design-of-existing-code-original-imadbn6yqj2wu7zs.jpeg?q=70"},
    
                    {bookname: "HERNAN DÍAZ, IN THE DISTANCE (2018)",
                    des: "A young Swedish immigrant finds himself penniless and alone in California. The boy travels East in search of his brother, moving on foot against the great current of emigrants pushing West. Driven back again and again, he meets naturalists, criminals, religious fanatics, swindlers, Indians, and lawmen, and his exploits turn him into a legend. Diaz defies the conventions of historical fiction and genre, offering a probing look at the stereotypes that populate our past and a portrait of radical foreignness.",
                    state: "To read on next nov",
                     img: "https://images-na.ssl-images-amazon.com/images/I/81NEKx2OCeL.jpg"}
            ]
        });
        const Omarnew = new userSchemaModal ({
            Email: "odiab92@gmail.com",
            Books:  [
                {bookname: "Jaws: A Novel",
                des: "When Peter Benchley wrote Jaws in the early 1970s, he meticulously researched all available data about shark behavior. Over the ensuing decades, Benchley was actively engaged with scientists and filmmakers on expeditions around the world as they expanded their knowledge of sharks. Also during this time, there was an unprecedented upswing in the number of sharks killed to make shark-fin soup, and Benchley worked with governments and nonprofits to sound the alarm for shark conservation. He encouraged each new generation of Jaws fans to enjoy his riveting tale and to channel their excitement into support and protection of these magnificent, prehistoric apex predators." ,
                state: "Best seller book.",
                img: "data:image/jpeg;base64,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"},
 
                { bookname: "Refactoring",
                des: "Code gets messy over time. That's just a circumstance we cannot change. But what we can change is the complexity of our codebase through refactoring.The classic Refactoring by Martin Fowler and Kent Beck will show you how you can identify bloated code, and how you can work your way through the old, entangled codebase to a new shiny, refactored one.The books is old, but still a classic. The examples are Java heavy but can be applied to other codebases, as well.",
                state: " Just done reading",
                img: "https://rukminim1.flixcart.com/image/416/416/book/6/6/7/refactoring-improving-the-design-of-existing-code-original-imadbn6yqj2wu7zs.jpeg?q=70"},
 
                 {bookname: "HERNAN DÍAZ, IN THE DISTANCE (2018)",
                 des: "A young Swedish immigrant finds himself penniless and alone in California. The boy travels East in search of his brother, moving on foot against the great current of emigrants pushing West. Driven back again and again, he meets naturalists, criminals, religious fanatics, swindlers, Indians, and lawmen, and his exploits turn him into a legend. Diaz defies the conventions of historical fiction and genre, offering a probing look at the stereotypes that populate our past and a portrait of radical foreignness.",
                 state: "To read on next nov",
                  img: "https://images-na.ssl-images-amazon.com/images/I/81NEKx2OCeL.jpg"}
         ]
        });
    Omarnew.save(); 
    Omar.save();
    Victoria.save();
}
seedUserCollection();

app.get('/book', getBooks);
// /book?email=vzulof@gmail.com
function getBooks(req, res) 
{   let requestedEmail = req.query.email; // email is the parameter you have after localhost in which you check
    console.log(requestedEmail);

    userSchemaModal.find({ Email: requestedEmail }, //Email here is your object parameter which is different than you local host parameter 
        function (err, bookData) 
        {
            if (err) { console.log('Oooops, something is wrong');}
            else {res.status(200).send(bookData[0].Books)};// Books is your object parameter that you want to render in front end (you dont need your email).  
            console.log(bookData[0].Books);//you will see this in terminal after listening to your port
        }
        );
        
}


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})
