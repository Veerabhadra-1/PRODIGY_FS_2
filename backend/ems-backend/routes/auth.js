import express from "express";
import { body } from "express-validator";
import { register, login, me } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 })
  ],
  register
);

router.post(
  "/login",
  [ body("email").isEmail(), body("password").notEmpty() ],
  login
);

router.get("/me", authMiddleware, me);

export default router;
