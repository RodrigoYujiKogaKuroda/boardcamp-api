import { categorySchema } from "../models/category.model.js";

export async function categorySchemaValidation(req, res, next) {

    const { name } = req.body;
    if (!name) {
        res.sendStatus(400);
    }

    const categories = await connection.query("SELECT name FROM categories");
    const doesNameExist = categories.find(element => element === name);
    if (doesNameExist) {
        res.sendStatus(409);
    }

    res.locals.name = name;

    next();

}