import { connection } from "../database/database.js";

export async function getRentals (req, res) {

    try {
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function postRentals (req, res) {

    const { 
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee
    } = res.locals.rental;

    try {
        await connection.query(
            `INSERT INTO
                rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7);`,
            [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function endRental (req, res) {

    try {
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function deleteRental (req, res) {

    try {
    } catch (err) {
        res.status(500).send(err.message);
    }

}