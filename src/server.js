import express from "express";
import pg from "pg";

const { Pool } = pg;

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const app = express();
app.use(express.json());

app.listen(4000, () => {
    console.log("Server listening on port 4000.");
});