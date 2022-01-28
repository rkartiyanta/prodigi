import express from "express";

import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    getMostViewProduct
} from "../controller/product.js";

import {
    getMostWishlistProduct,
    getAllWishlists,
    createWishlist,
    deleteWishlist
} from "../controller/wishlist.js";

import {
    createAccount,
    login
} from "../controller/account.js";

const router = express.Router();

router.post('/auth/register', createAccount);
router.post('/auth/login', login);

router.get('/product/', getAllProducts);
router.post('/product/', createProduct);
router.get('/product/view', getMostViewProduct);
router.get('/product/wishlist', getMostWishlistProduct);
router.get('/product/:id', getProductById);
router.patch('/product/:id', updateProduct);

router.get('/wishlist', getAllWishlists);
router.post('/wishlist', createWishlist);
router.delete('/wishlist', deleteWishlist);

export default router;