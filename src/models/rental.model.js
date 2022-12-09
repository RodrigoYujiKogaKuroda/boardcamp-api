import Joi from "joi";

export const rentalSchema = Joi.object({
    customerId: Joi.number().min(1).required(),
    gameId: Joi.number().min(1).required(),
    rentDate: Joi.date().required(),
    daysRented: Joi.number().min(1).required(),
    returnDate: Joi.date().required(),
    originalPrice: Joi.number().min(1).required(),
    delayFee: Joi.number().min(1).required()
});