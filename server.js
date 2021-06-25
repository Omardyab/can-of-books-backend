'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
const PORT = process.env.PORT||3010;

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
                     img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1525352787l/40029490._SY475_.jpg"}
            ]
        });
        const Omarnew = new userSchemaModal ({
            Email: "odiab92@gmail.com",
            Books:  [
                {bookname: "Jaws: A Novel",
                des: "When Peter Benchley wrote Jaws in the early 1970s, he meticulously researched all available data about shark behavior. Over the ensuing decades, Benchley was actively engaged with scientists and filmmakers on expeditions around the world as they expanded their knowledge of sharks. Also during this time, there was an unprecedented upswing in the number of sharks killed to make shark-fin soup, and Benchley worked with governments and nonprofits to sound the alarm for shark conservation. He encouraged each new generation of Jaws fans to enjoy his riveting tale and to channel their excitement into support and protection of these magnificent, prehistoric apex predators." ,
                state: "Best seller book.",
                img: "http://www.anovelfilm.com/wp-content/uploads/2013/07/jaws.jpg"},
 
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
// seedUserCollection();

app.get('/book', getBooks);
// /book?email=vzulof@gmail.com
function getBooks(req, res)
{   let requestedEmail = req.query.email; // email is the parameter you have after localhost in which you check
    console.log(requestedEmail);

    userSchemaModal.find({ Email: requestedEmail }, //Email here is your object parameter which is different than you local host parameter 
        function (err, bookData) 
        {
            if (err) {
                 console.log('Oooops, something is wrong');
                     }
            else{
                 res.send(bookData[0].Books);
            // console.log('working');
            console.log(bookData[0].Books)
                }// Books is your object parameter that you want to render in front end (you dont need your email).  
            //console.log(bookData[0].Books);//you will see this in terminal after listening to your port
        }
        );
        
}


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

