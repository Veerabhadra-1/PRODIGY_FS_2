import express from "express";
import departmentController from "../controllers/departmentController.js";
// import authMiddleware from "../middleware/authMiddleware.js"; // keep for later

const router = express.Router();

// TEMP: disable auth for testing
// router.use(authMiddleware);

router.get("/", departmentController.getDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.post("/", departmentController.createDepartment);
router.put("/:id", departmentController.updateDepartment);
router.delete("/:id", departmentController.deleteDepartment);

export default router;
