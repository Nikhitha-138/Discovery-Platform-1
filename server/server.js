const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
require('./db');
app.use(cors());
app.use(express.json());

const Login = require('./routes/login');
app.use(Login);
const Category = require('./routes/category');
app.use(Category);
const Product = require('./routes/product');
app.use(Product);
const User = require('./routes/user');
app.use(User);
const WishLists = require('./routes/wishlist')
app.use(WishLists)

app.listen(process.env.PORT || 8000, err => {
  if (err) {
    console.error('Server failed to start:', err);
  } else {
    console.log(
      `App is running on http://localhost:${process.env.PORT || 8000}`
    );
  }
});
