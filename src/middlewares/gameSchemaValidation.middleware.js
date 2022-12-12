import { gameSchema } from "../models/game.model.js";
import { connection } from "../database/database.js";

export async function gameSchemaValidation(req, res, next) {

    const { 
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay
    } = req.body;

    const game = {
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay
    };

    const { error } = gameSchema.validate(game, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
    
    try {
        const categories = await connection.query("SELECT id FROM categories;");
        const doesIdExist = categories.rows.find(element => element.id === categoryId);
        if (!doesIdExist) {
            return res.sendStatus(400);
        }

        const games = await connection.query("SELECT name FROM games;");
        const doesGameExist = games.rows.find(element => element.name === name);
        if (doesGameExist) {
            return res.sendStatus(409);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

    res.locals.game = game;
    
    next();

}