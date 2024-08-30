import { Router } from "express";
import { JWT } from "../services/jwt";
import { CaretakerRepository, ResidentRepository } from "../repositories";
import { AdminController } from "../../controllers/admin.controller";
import { AdminUseCase } from "../../use-cases/admin.use-case";
import {upload} from "@neighbr/common";

//services
const jwt = new JWT();

//repositories
const residentRepository = new ResidentRepository();
const caretakerRepository = new CaretakerRepository();

//usecases
const adminUseCase = new AdminUseCase(residentRepository, caretakerRepository, jwt);

//controllers
const adminController = new AdminController(adminUseCase);

const router = Router();

//authentication routes
router.post("/login", (req, res, next) => adminController.login(req, res, next));

//resident management routes
router.post("/residents/create", upload.single("image"), (req, res, next) =>adminController.createResident(req, res, next));
router.get("/residents", (req, res, next) => adminController.getResidents(req, res, next));
router.put("/residents/:id/block-unblock", (req, res, next) => adminController.blockUnblockResident(req, res, next));

//caretaker management routes
router.get("/caretakers",(req, res, next) => adminController.getCaretakers(req, res, next));
router.post("/caretakers/create", upload.single("image"), (req, res, next) => adminController.createCaretaker(req, res, next));
router.put("/caretakers/:id/block-unblock", (req, res, next) => adminController.blockUnblockCaretaker(req, res, next));

export default router;