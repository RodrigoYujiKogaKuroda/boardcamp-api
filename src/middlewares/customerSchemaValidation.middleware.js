import { customerSchema } from "../models/customer.model.js";
import { connection } from "../database/database.js";

export async function customerSchemaValidation(req, res, next) {

    const { 
        name,
        phone,
        cpf,
        birthday
    } = req.body;

    const customer = {
        name,
        phone,
        cpf,
        birthday
    };

    const { error } = customerSchema.validate(customer, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
    
    try {
        const customers = await connection.query("SELECT cpf FROM customers;");
        const doesCpfExist = customers.rows.find(element => element.cpf === cpf);
        if (doesCpfExist) {
            return res.sendStatus(409);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

    res.locals.customer = customer;
    
    next();

}