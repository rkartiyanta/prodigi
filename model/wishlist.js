import { Sequelize } from "sequelize";
import db from "../infra/database.js";

const { DataTypes } = Sequelize;

const Wishlist = db.define('wishlist', {
    account_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    });

export default Wishlist;