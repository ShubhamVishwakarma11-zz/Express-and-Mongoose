const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product');
const methodOverride = require('method-override');

mongoose.connect('mongodb://0.0.0.0:27017/farmStand')
    .then( () => {
        console.log("Database Connection Successful")
    })
    .catch( err=> {
        console.log("Error!");
        console.log(err);
    });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.get('/', (req,res) => {
    res.send("Home Route");
})

app.get('/products', async (req,res) => {
    
    // console.log(products);
    const {category} = req.query;
    if (category) {
        const products = await Product.find({category});
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: "All" });
    }
})

app.get('/products/new', (req,res) => {
    res.render('products/new');
})

app.get('/products/:id', async (req,res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    // console.log(product);
    res.render('products/show', { product });
})

app.get('/products/:id/edit', async (req,res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    const categories = ['fruit', 'vegetable', 'dairy'];
    // Product.find({}).then(data => {
    //     data.map( p => {
    //         categories.push(p.category);
    //     })
    // })
    console.log(categories);
    res.render('products/edit', {product, categories});
})

app.post('/product', async (req,res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
})

app.put('/products/:id', async (req,res) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new:true});
    res.redirect(`/products/${updatedProduct._id}`);
})

app.delete('/products/:id', async (req,res) => {
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
})

app.listen(3000, () => {
    console.log("App is listening on port 3000")
})