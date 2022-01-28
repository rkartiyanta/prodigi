import { Sequelize } from "sequelize";
import db from "../infra/database.js";

const { DataTypes } = Sequelize;

const Product = db.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    brand: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DOUBLE
    },
    discount: {
        type: DataTypes.STRING
    },
    image_url: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    total_view: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.STRING
    }
}, {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    });

export default Product;