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

router.post("/login", (req, res, next) => adminController.login(req, res));
router.post("/residents/create", upload.single("image"), (req, res, next) =>adminController.createResident(req, res));
router.get("/residents", (req, res, next) => adminController.getResidents(req, res));
router.put("/residents/:id/block-unblock", (req, res, next) =>adminController.blockUnblockResident(req, res));

export default router;