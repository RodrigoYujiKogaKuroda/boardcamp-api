import express from "express";
import pg from "pg";

const { Pool } = pg;

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const app = express();
app.use(express.json());

//'Categories' routes
app.get("/categories", async (req, res) => {
    const categories = await connection.query("SELECT * FROM categories");
    res.send(categories);
});

app.post("/categories", async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.sendStatus(400);
        return;
    }

    const categories = await connection.query("SELECT name FROM categories");
    const doesNameExist = categories.find(element => element === name);
    if (doesNameExist) {
        res.sendStatus(409);
        return;
    }

    const result = await connection.query(
        "INSERT INTO receitas (name) VALUES ($1)",
        [name]
    );

    res.sendStatus(201);
});
//================================================================================================

//'Games' routes
app.get("/games", async (req, res) => {
});

app.post("/games", async (req, res) => {
});
//================================================================================================

//'Customers' routes
app.get("/customers", async (req, res) => {
});

app.get("/customers/:id", async (req, res) => {
});

app.post("/customers", async (req, res) => {
});

app.put("/customers/:id", async (req, res) => {
});
//================================================================================================

//'Rentals' routes
app.get("/rentals", async (req, res) => {
});

app.post("/rentals", async (req, res) => {
});

app.post("/rentals/:id/return", async (req, res) => {
});

app.delete("/rentals/:id", async (req, res) => {
});
//================================================================================================

app.listen(4000, () => {
    console.log("Server listening on port 4000.");
});