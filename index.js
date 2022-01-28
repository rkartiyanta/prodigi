import express from "express";
import db from "./infra/database.js";
import routes from "./api/index.js";

const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

app.use(express.json());
app.use('/api', routes);

app.listen(8091, () => console.log('Server running at port 8091'));