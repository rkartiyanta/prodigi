import { Sequelize } from "sequelize";
import db from "../infra/database.js";

const { DataTypes } = Sequelize;

const Account = db.define('account', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    }
}, {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    });

export default Account;