import { connection } from "../database/database.js";

export async function categorySchemaValidation(req, res, next) {

    const { name } = req.body;
    if (!name) {
        return res.sendStatus(400);
    }

    try {
        const categories = await connection.query("SELECT name FROM categories;");
        const doesNameExist = categories.rows.find(element => element.name === name);
        if (doesNameExist) {
            return res.sendStatus(409);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

    res.locals.category = name;

    next();

}