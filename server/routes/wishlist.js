const express = require('express');
const router = express.Router();
const WishList = require('../db/models/WishList');
const Product = require('../db/models/product');
const UserToken = require('../middleware/user-auth');


// Toggle wishlist (Add if not exists, Remove if exists)
router.post('/user/wishlist', UserToken, async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingItem = await WishList.findOne({ userId, productId });

        if (existingItem) {
            // Remove if exists
            await WishList.findByIdAndDelete(existingItem._id);
            return res.status(200).json({
                statusCode: 200,
                message: 'Removed from wishlist',
                removed: true
            });
        } else {
            // Add if doesn't exist
            const wishlistItem = await WishList.create({ userId, productId });
            return res.status(201).json({
                statusCode: 201,
                message: 'Added to wishlist',
                data: wishlistItem,
                removed: false
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/user/wishlist', UserToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await WishList.find({ userId }).populate('productId');

        res.status(200).json({
            statusCode: 200,
            message: 'Wishlist fetched successfully',
            data: wishlist
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/user/wishlist/:id', UserToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const itemId = req.params.id;

        const deletedItem = await WishList.findOneAndDelete({ _id: itemId, userId });
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({
            statusCode: 200,
            message: 'Removed from wishlist'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;