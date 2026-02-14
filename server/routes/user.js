const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const Product = require('../db/models/product');
const AdminToken = require('../middleware/admin-auth');
const UserToken = require('../middleware/user-auth');


router.get('/users', AdminToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find({ role: 'User' })
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments({ role: 'User' });

        res.status(200).json({
            statusCode: 200,
            message: 'Users fetched successfully',
            data: users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/dashboard', AdminToken, async (req, res) => {
    try {
        const countUser = await User.countDocuments({ role: 'User' });
        const countProduct = await Product.countDocuments();


        const recentUsers = await User.find({ role: 'User' })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('-password');

        res.status(200).json({
            statusCode: 200,
            message: 'Dashboard data fetched successfully',
            data: {
                countUser,
                countProduct,
                RecentActivity: recentUsers
            }
        });
    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/user/productlist', UserToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Filtering logic
        const query = { status: 'active' };

        if (req.query.category) {
            query.category = req.query.category;
        }

        if (req.query.productName) {
            query.productName = { $regex: req.query.productName, $options: 'i' };
        }

        if (req.query.minTHC || req.query.maxTHC) {
            query.THC = {};
            if (req.query.minTHC) query.THC.$gte = parseFloat(req.query.minTHC);
            if (req.query.maxTHC) query.THC.$lte = parseFloat(req.query.maxTHC);
        }

        const productList = await Product.find(query)
            .sort({ createdAt: -1 })
            .populate('category')
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments(query);

        res.status(200).json({
            statusCode: 200,
            message: 'Product list fetched successfully',
            data: productList,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/user/product/:id', UserToken, async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({
            statusCode: 200,
            message: 'Product fetched successfully',
            data: product
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})




module.exports = router;