import { Router } from "express";
import {getGames, postGames} from '../controllers/games.controller.js'
import { gameSchemaValidation } from "../middlewares/gameSchemaValidation.middleware.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", gameSchemaValidation, postGames);

export default router;