import { rentalSchema } from "../models/rental.model.js";
import { connection } from "../database/database.js";

export async function rentalSchemaValidation(req, res, next) {

    const { 
        customerId,
        gameId,
        daysRented
    } = req.body;

    const date = new Date();
    date.setDate(date.getDate() + 30);

    const games = await connection.query("SELECT * FROM games WHERE id=$1;", [gameId]);
    if (!games.rows[0]) {
        return res.sendStatus(400);
    }

    const rental = {
        customerId,
        gameId,
        rentDate: date,
        daysRented,
        returnDate: null,
        originalPrice: (games.rows[0].pricePerDay * daysRented),
        delayFee: null
    };

    const { error } = rentalSchema.validate(rental, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
  
    try {
        const customers = await connection.query("SELECT id FROM customers;");
        const doesCustomerExist = customers.rows.find(element => element.id === customerId);
        if (!doesCustomerExist) {
            return res.sendStatus(400);
        }

        const rentals = await connection.query(`SELECT "gameId" FROM rentals;`);
        const allRentals = rentals.rows.filter(element => element.gameId === gameId);
        if (allRentals.length > games.rows[0].stockTotal) {
            return res.sendStatus(400);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

    res.locals.rental = rental;
    
    next();

}