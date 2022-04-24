const mongoose = require('mongoose');

const Product = require('./models/product')

mongoose.connect('mongodb://0.0.0.0:27017/farmStand')
    .then( () => {
        console.log("Database Connection Successful")
    })
    .catch( err=> {
        console.log("Error!");
        console.log(err);
    });


const seedProducts = [
    {
        name: "Fairy Eggplant",
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: "Organic Melon",
        price: 4.99,
        category: 'fruit'
    },
    {
        name: "Seedless Watermelon",
        price: 3.99,
        category: 'fruit'
    },
    {
        name: "Organic Celery",
        price: 1.50,
        category: 'vegetable'
    }
];

Product.insertMany(seedProducts)
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err);
}) 