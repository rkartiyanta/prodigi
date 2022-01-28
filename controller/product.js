import Product from "../model/product.js";
import db from "../infra/database.js";
import { Sequelize } from "sequelize";
import { validateAdmin } from "../pkg/auth.js";

const { Op } = Sequelize;

export const getAllProducts = async (req, res) => {
    try {
        let reqLimit = 20;
        if (parseInt(req.params.perpage, 10) < 0) {
            reqLimit = parseInt(req.params.price, 10);
        }

        let reqOffset = 0;
        if (parseInt(req.params.page, 10) < 0) {
            reqOffset = (parseInt(req.params.page, 10) - 1) * reqLimit;
        }

        let reqName = "";
        if (req.params.name !== undefined) {
            reqName = req.params.name;
        }

        let reqBrand = "";
        if (req.params.brand !== undefined) {
            reqBrand = req.params.brand;
        }

        let reqType = "";
        if (req.params.type !== undefined) {
            reqType = req.params.type;
        }

        let reqPrice = 0;
        if (parseInt(req.params.price, 10) > 0) {
            reqPrice = parseInt(req.params.price, 10);
        }

        let reqDiscount = 0;
        if (parseInt(req.params.discount, 10) > 0) {
            reqDiscount = parseInt(req.params.discount, 10);
        }
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    {
                        [Op.and]: [
                            {
                                name: {
                                    [Op.like]: '%' + reqName + '%'
                                }
                            },
                            {
                                brand: {
                                    [Op.like]: '%' + reqBrand + '%'
                                }
                            },
                            {
                                type: {
                                    [Op.like]: '%' + reqType + '%'
                                }
                            },
                        ]
                    },
                    {
                        [Op.and]: [
                            { price: reqPrice },
                            {
                                price: {
                                    [Op.gt]: 0
                                }
                            }
                        ]
                    },
                    {
                        [Op.and]: [
                            { discount: reqDiscount },
                            {
                                discount: {
                                    [Op.gt]: 0
                                }
                            }
                        ]
                    },
                ]
            },
            limit: reqLimit,
            offset: reqOffset,
        });
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        });

        await Product.increment({ total_view: 1 }, { where: { id: req.params.id } });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getMostViewProduct = async (req, res) => {
    try {
        if (validateAdmin(req)) {
            res.status(403).json({ error: "User is not an admin" });
            return
        }
        const product = await Product.findOne({
            group: 'id',
            order: [
                [db.fn('MAX', db.col('total_view')), 'DESC'],
            ]
        });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        if (validateAdmin(req)) {
            res.status(403).json({ error: "User is not an admin" });
            return
        }

        let stringdata = JSON.stringify(req.body);
        let data = JSON.parse(stringdata);

        let errorMessage = "";
        if (checkNull(data.name)) {
            errorMessage = "Name cannot be empty";
        }

        if (checkNull(data.brand)) {
            errorMessage = "Brand cannot be empty";
        }

        if (checkNull(data.type)) {
            errorMessage = "Type cannot be empty";
        }

        if (checkNull(data.description)) {
            errorMessage = "Description cannot be empty";
        }

        if (data.price < 1) {
            errorMessage = "Invalid price";
        }

        if (!checkNull(data.image_url)) {
            if (data.image_url.length < 3) {
                errorMessage = "Please provide 3 images";
            }
        } else {
            errorMessage = "Please provide 3 images";
        }

        if (errorMessage != "") {
            res.status(400).json({ error: errorMessage });
            return
        }

        let reqDiscount = 0;
        if (data.discount > 0) {
            reqDiscount = reqDiscount;
        }

        await Product.create({
            name: data.name,
            description: data.description,
            brand: data.brand,
            type: data.type,
            price: data.price,
            discount: reqDiscount,
            image_url: data.image_url,
            created_at: new Date().toUTCString(),
        });


        res.status(201).json({
            "message": "Product Created"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        if (validateAdmin(req)) {
            res.json({ message: "User is not an admin" });
        }

        await Product.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product updated"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

function checkNull(input) {
    return input === undefined || input == null || input == ""
}