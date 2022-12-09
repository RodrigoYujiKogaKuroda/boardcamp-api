import { Router } from "express";
import { getCustomers, getCustomerById, postCustomers, updateCustomer } from '../controllers/customers.controller.js'
import { customerSchemaValidation } from "../middlewares/customerSchemaValidation.middleware.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerById);
router.post("/customers", customerSchemaValidation, postCustomers);
router.put("/customers/:id", updateCustomer);

export default router;