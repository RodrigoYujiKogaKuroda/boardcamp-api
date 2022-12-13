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

    const { id } = req.params;

    try {
        const rental = await connection.query(
            "SELECT * FROM rentals WHERE id=$1;",
            [id]
        );
        if (rental.rows.length === 0) {
            res.sendStatus(404);
        }

        if (rental.rows[0].returnDate === null) {
            const date = new Date();
            date.setDate(date.getDate());
            let daysDelayed = date - (rental.rows[0].rentDate + rental.rows[0].daysRented);
            let delayFee = null;
            if (daysDelayed > 0) {
                delayFee = daysDelayed * (rental.rows[0].originalPrice / rental.rows[0].daysRented);
            }
            await connection.query(
                `UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`,
                [date, delayFee, id]
            );
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function deleteRental (req, res) {

    const { id } = req.params;

    try {
        const rental = await connection.query(
            "SELECT * FROM rentals WHERE id=$1;",
            [id]
        );
        if (rental.rows.length === 0) {
            res.sendStatus(404);
        }
        if (!rental.rows[0].returnDate) {
            res.sendStatus(400);
        }

        await connection.query(
            `DELETE FROM rentals WHERE id=$1`,
            [id]
        );
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }

}