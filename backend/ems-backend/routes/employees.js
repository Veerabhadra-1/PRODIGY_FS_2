import express from "express";
import { body, validationResult } from "express-validator";
import {
  listEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/employeeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Validation middlewares for create and update
const validateCreate = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be 'Male' or 'Female'"),
  body("salary").optional().isFloat({ min: 0 }).withMessage("Salary must be a positive number"),
];

const validateUpdate = [
  body("firstName").optional().notEmpty().withMessage("First name cannot be empty"),
  body("lastName").optional().notEmpty().withMessage("Last name cannot be empty"),
  body("email").optional().isEmail().withMessage("Must be a valid email"),
  body("gender")
    .optional()
    .isIn(["Male", "Female"])
    .withMessage("Gender must be 'Male' or 'Female'"),
  body("salary").optional().isFloat({ min: 0 }).withMessage("Salary must be a positive number"),
];

// Middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Routes
router.get("/", authMiddleware, listEmployees);
router.get("/:id", authMiddleware, getEmployee);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  validateCreate,
  handleValidationErrors,
  createEmployee
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  validateUpdate,
  handleValidationErrors,
  updateEmployee
);

router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteEmployee);

export default router;
