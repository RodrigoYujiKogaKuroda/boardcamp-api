import { connection } from "../database/database.js";

export async function categorySchemaValidation(req, res, next) {

    const { name } = req.body;
    if (!name) {
        res.sendStatus(400);
        return;
    }

    const categories = await connection.query("SELECT name FROM categories;");
    const doesNameExist = categories.rows.find(element => element.name === name);
    if (doesNameExist) {
        res.sendStatus(409);
        return;
    }

    res.locals.name = name;

    next();

}