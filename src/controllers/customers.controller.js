import { connection } from "../database/database.js";

export async function getCustomers (req, res) {

    try {
        const customers = await connection.query("SELECT * FROM customers;");
        res.send(customers.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function getCustomerById (req, res) {

    const { id } = req.params;

    try {
        const customers = await connection.query(
            "SELECT * FROM customers WHERE id=$1;",
            [id]
        );
        if (customers.rows.length === 0) {
            res.sendStatus(404);
        }
        res.send(customers.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function postCustomers (req, res) {

    const { 
        name,
        phone,
        cpf,
        birthday
    } = res.locals.customer;

    try {
        await connection.query(
            `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
            [name, phone, cpf, birthday]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function updateCustomer (req, res) {

    const { id } = req.params;

    const { 
        name,
        phone,
        cpf,
        birthday
    } = res.locals.customer;

    try {
        await connection.query(
            `UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`,
            [name, phone, cpf, birthday, id]
        );
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }

}