import { Sequelize } from "sequelize";

const db = new Sequelize('prodigi', 'postgres', 'richard1234', {
    host: "localhost",
    dialect: "postgres",
    autoIncrement: true,
    omitNull: true
});

export default db;