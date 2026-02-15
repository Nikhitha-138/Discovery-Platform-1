const express = require('express');
const router = express.Router();
const Category = require('../db/models/category');
const AdminToken = require('../middleware/admin-auth');
const UserToken = require('../middleware/user-auth');

router.post('/categories', AdminToken, async (req, res) => {
  try {
    const { categoryName, description } = req.body;
    const newCategory = await Category.create({ categoryName, description });
    res.status(201).json({
      statusCode: 201,
      message: 'Category created successfully',
      data: newCategory,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Server error',
      error: err.message,
    });
  }
});

router.get('/categories', AdminToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const categories = await Category.find().skip(skip).limit(limit);
    const total = await Category.countDocuments();

    res.status(200).json({
      statusCode: 200,
      message: 'Categories fetched successfully',
      data: categories,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Server error',
      error: err.message,
    });
  }
});


router.get('/user/categories', UserToken, async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      statusCode: 200,
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Server error',
      error: err.message,
    });
  }
});

router.delete('/categories/:id', AdminToken, async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Category not found',
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: 'Category deleted successfully',
      data: deletedCategory,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Server error',
      error: err.message,
    });
  }
});

router.patch('/categories/:id', AdminToken, async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { categoryName, description, status } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { categoryName, description, status },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Category not found',
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: 'Category updated successfully',
      data: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Server error',
      error: err.message,
    });
  }
});

module.exports = router;
