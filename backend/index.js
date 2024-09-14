const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

//database connection with mongoose
mongoose.connect(
  "mongodb+srv://glamfitdev:glamfit%402024@cluster0.hv8pl.mongodb.net/e-commerce"
);

//Api creation
app.get("/", (req, res) => {
  res.send("express App is Running");
});

// image storage Engines

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });
//creating upload endpoint for image

app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//schema for creating products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

//api for adding products
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});
//creating Api for deleting product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});
//creating api for getting all products from database

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Product Fetched");
  res.send(products);
});

// schema creating for users
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
// creating end point for registration

app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      error: "existing user found with same email address",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//creating endpoint fo ruser login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "Wrong Password" });
    }
  } else {
    res.json({ success: false, error: "Wrong Email Id" });
  }
});

// creatinfg end point for newcollection data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollection Fetched");
  res.send(newcollection);
});
// endpoint for popular in women section
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let women = products.slice(0, 4);
  console.log("Popular in women fetched");
  res.send(women);
});
// creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "please authenticate using valid token" });
    }
  }
};

// creatign endpoints for adding product in cart database
app.post("/addtocart", fetchUser, async (req, res) => {
  try {
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });

    // Check if cartData and itemId exist
    if (!userData.cartData[req.body.itemId]) {
      userData.cartData[req.body.itemId] = 0; // Initialize if doesn't exist
    }

    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    // Send a proper JSON response
    res.json({
      success: true,
      message: "Item added to cart",
      cart: userData.cartData,
    });
    console.log("Item added to cart");
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
    console.log(error);
  }
});

// creating endpoint for remove product from card data
app.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });

    if (userData.cartData[req.body.itemId] > 0) {
      userData.cartData[req.body.itemId] -= 1;
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        { cartData: userData.cartData }
      );
      res.json({
        success: true,
        message: "Item removed from cart",
        cart: userData.cartData,
      });
      console.log("Item removed from cart");
    } else {
      res.json({
        success: false,
        message: "Item not in cart or already removed",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
    console.log(error);
  }
});

// creating endpoint for cart
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});
// port running

app.listen(port, (error) => {
  if (!error) {
    console.log("Server is Running on " + port);
  } else {
    console.log("error:" + error);
  }
});
