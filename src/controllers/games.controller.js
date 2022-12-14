import { connection } from "../database/database.js";

export async function getGames (req, res) {

    const queryName = req.query.name;

    try {
        if (queryName) {
            const games = await connection.query(`
                SELECT games.*, categories.name AS "categoryName"
                FROM games
                    JOIN categories
                        ON games."categoryId" = categories.id
                WHERE games.name
                    ILIKE $1;`,
                [`${queryName}%`]
            );
            res.send(games.rows);
        } else {
            const games = await connection.query(`
            SELECT games.*, categories.name AS "categoryName"
            FROM games
                JOIN categories
                    ON games."categoryId" = categories.id;
            `,);
            res.send(games.rows);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function postGames (req, res) {

    const { 
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay
    } = res.locals.game;

    try {
        await connection.query(
            `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`,
            [name, image, stockTotal, categoryId, pricePerDay]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }

}