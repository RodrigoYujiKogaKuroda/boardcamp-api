import { Router } from "express";
import { getRentals, postRentals, endRental, deleteRental } from '../controllers/rentals.controller.js'
import { rentalSchemaValidation } from "../middlewares/rentalSchemaValidation.middleware.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalSchemaValidation, postRentals);
router.post("/rentals/:id/return", endRental);
router.delete("/rentals/:id", deleteRental);

export default router;