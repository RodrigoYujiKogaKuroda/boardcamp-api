import { Router } from "express";
import { getCategories, postCategories } from '../controllers/categories.controller.js'
import { categorySchemaValidation } from "../middlewares/categorySchemaValidation.middleware.js";

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", categorySchemaValidation, postCategories);

export default router;