import { Router } from "express";
import { JWT } from "../services/jwt";
import { AdminRepository } from "../repositories";
import { AdminController } from "../../controllers/admin.controller";
import { AdminUseCase } from "../../use-cases/admin.use-case";
import upload from "../middlewares/multer.middleware";

//services
const jwt = new JWT();

//repositories
const adminRepository = new AdminRepository();

//usecases
const adminUseCase = new AdminUseCase(adminRepository, jwt);

//controllers
const adminController = new AdminController(adminUseCase);

const router = Router();

//authentication routes
router.post("/login", (req, res, next) => adminController.login(req, res));

//resident management routes
router.post("/residents/create", upload.single("image"), (req, res, next) =>adminController.createResident(req, res));
router.get("/residents", (req, res, next) => adminController.getResidents(req, res));
router.put("/residents/:id/block-unblock", (req, res, next) => adminController.blockUnblockResident(req, res));

//caretaker management routes
router.get("/caretakers",(req, res, next) => adminController.getCaretakers(req, res));
router.post("/caretakers/create", upload.single("image"), (req, res, next) => adminController.createCaretaker(req, res));
router.put("/caretakers/:id/block-unblock", (req, res, next) => adminController.blockUnblockCaretaker(req, res));

export default router;