import express from "express";
import dotenv from "dotenv";
dotenv.config();

import categoriesRoutes from "./routes/categories.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import customersRoutes from "./routes/customers.routes.js";
import rentalsRoutes from "./routes/rentals.routes.js";

const app = express();
app.use(express.json());

app.use(categoriesRoutes);
app.use(gamesRoutes);
app.use(customersRoutes);
app.use(rentalsRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));