import Product from "../model/product.js";
import Wishlist from "../model/wishlist.js";
import db from "../infra/database.js";
import { validateAdmin } from "../pkg/auth.js";

export const getMostWishlistProduct = async (req, res) => {
    try {
        if (validateAdmin(req)) {
            res.status(403).json({ error: "User is not an admin" });
            return
        }

        const wishlist = await Wishlist.findOne({
            attributes: [
                'product_id',
                [db.fn('COUNT', db.col('product_id')), 'count']
            ],
            group: 'product_id',
            order: [
                [db.fn('COUNT', db.col('product_id')), 'DESC'],
            ]
        });
        res.json(wishlist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const createWishlist = async (req, res) => {
    try {
        let userID = parseInt(req.get("User-ID"));

        let stringdata = JSON.stringify(req.body);
        let data = JSON.parse(stringdata);

        if (data.product_id < 1) {
            res.status(400).json({ error: "Invalid product" });
            return
        }

        await Wishlist.create({
            account_id: userID,
            product_id: data.product_id
        });

        res.status(201).json({
            "message": "Wishlist created"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getAllWishlists = async (req, res) => {
    try {
        Product.belongsTo(Wishlist, { foreignKey: 'id' })

        let userID = parseInt(req.get("User-ID"));
        Product.findAll({
            include: [{
                model: Wishlist,
                on: {
                    col1: db.where(db.col("product.id"), "=", db.col("wishlist.product_id"))
                },
                attributes: [],
                where: { account_id: userID },
                required: true
            }]
        }).then(function (products) {
            res.json(products);
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


export const deleteWishlist = async (req, res) => {
    try {
        let userID = parseInt(req.get("User-ID"));

        let stringdata = JSON.stringify(req.body);
        let data = JSON.parse(stringdata);

        await Wishlist.destroy({
            where: {
                account_id: userID,
                product_id: data.product_id
            }
        });
        res.json({
            "message": "Wishlist deleted"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}