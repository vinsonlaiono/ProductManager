// =========== REQUIRE MODULES ==============
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('express-flash')
const port = 5000;

var session = require('express-session');
var path = require('path');

// =========== Use =================
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Points to the angular file to server the index.html
app.use(express.static(__dirname + '/public/dist/public'));

// =========== LISTEN PORT ===========
app.listen(port, function () {
    console.log("You are listening on port 5000")
})
// =========== MONGOOSE CONNECTION ===========
// Here is where you can change the database information
// from the name to the collections 

mongoose.connect('mongodb://localhost/productManager');
var ProductSchema = new mongoose.Schema({
    title: { type: String, required: [true, " Title must be at least 4 characters long"], minlength: 4 },
    price: { type: Number, required: [true, "Please enter a price"] },
    image_url: { type: String },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema)
mongoose.Promise = global.Promise;

// ====================== ROUTES ======================

app.get('/', function (req, res) {
    res.json({ message: "you made it to the root route" })
})

//  ====================== GET ALL PRODUCTS ======================
app.get('/allproducts', (req, res) => {
    Product.find({}, (err, product) => {
        if (err) {
            console.log("Error: ", err)
            res.json({ Error: err })
        } else {
            console.log("All Products", product)
            res.json({ message: "Succefully retrieved all products", product: product })

        }
    })
})
//====================== GET ONE PRODUCT ======================
app.get('/product/:id', (req, res) => {
    console.log(req.params.id)
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.json({ error: err })
        } else {
            res.json({ product: product })
        }
    })
})
// ====================== CREATE A NEW PRODUCT ======================
app.post('/products', function (req, res) {
    console.log("Create a single product route")
    console.log(req.body)
    Product.create({
        title: req.body.title, image_url: req.body.image_url, price: req.body.price
    }, function (err, product) {
        if (err) {
            console.log(err)
            res.json({ message: "Error", error: err })
        } else {
            res.json({ message: "Success", data: product })
        }
    })
});
// ====================== DELETE A PRODUCT ======================
app.delete('/delete/:id', function (req, res) {
    console.log("In delete route server.js")
    Product.findByIdAndRemove(req.params.id, function (err, product) {
        console.log("In delete route call back")

        res.json({ product })
    })
});

// ====================== EDIT PRODUCT ======================
app.put('/products/:id/edit', (req, res) => {
    console.log("in edit route server.js======================")
    console.log("NAME: ", req.body.title)
    console.log("ID: ", req.params.id)

    Product.findOneAndUpdate({ _id: req.params.id }, {$set: {title: req.body.title,price: req.body.price,image_url: req.body.image_url } }, { runValidators: true }, (err, product) => {
        if (err) {
            console.log("Errors ===========: ", err)
            res.json({ message: "Error" , err })
        } else {
            res.json({ message: "Success", product: product })
        }
    })
    // }
})
// ====================== REDIRECT TO ANGULAR ROUTES ======================
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});









// Product.findOne({_id: req.params.id}, (err, product) => {
                                
                                    //     product.title = req.body.title,
                                    //     product.    title: req.body.title,
                                    //     price: req.body.price,
                                    //         image_url: req.body.image_url
                                
                                    //     product.save((err, product) => {
                                    //         if(err){
                                    //             res.json({message: "Error", error: err})
                                    //         } else {
                                    //             res.json({ message: "Success", product: product })
                                    //         }
                                    //     })
                                    // })
                                
                                    // let title = req.body.title
                                    // let price = req.body.price
                                    // if (title.length < 3 || price < 0) {
                                    //     res.json({ errMessage: "Please fill out the form correctly" })
                                    // } else {