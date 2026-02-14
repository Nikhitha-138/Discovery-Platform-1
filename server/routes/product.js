const express = require('express');
const router = express.Router();
const Product = require('../db/models/product');
const Category = require('../db/models/category');
const AdminToken = require('../middleware/admin-auth');

router.post('/products', AdminToken, async (req, res) => {
  try {
    const { productName, description, status, THC, CBD, price, category, effect, usageType } =
      req.body;
    const product = await Product.create({
      productName,
      description,
      status,
      THC,
      CBD,
      price,
      category,
      effect,
      usageType,
    });
    res.status(201).json({
      statusCode: 201,
      message: 'Product created successfully',
      data: product,
    });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/products', AdminToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .populate('category', 'categoryName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments();

    res.status(200).json({
      statusCode: 200,
      message: 'Products fetched successfully',
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/products/:id', AdminToken, async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: 'Product deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/products/:id', AdminToken, async (req, res) => {
  try {
    const productId = req.params.id;
    const { productName, description, status, THC, CBD, price, category, effect, usageType } =
      req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        productName,
        description,
        status,
        THC,
        CBD,
        price,
        category,
        effect,
        usageType,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
