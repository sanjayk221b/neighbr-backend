import { Router } from "express";
import { JWT } from "../services/jwt";
import { ResidentRepository } from "../repositories";
import { ResidentController } from "../../controllers/resident.controller";
import { ResidentUseCase } from "../../use-cases/resident.use-case";

//services
const jwt = new JWT();

//repositories
const residentRepository = new ResidentRepository();

//usecases
const residentUseCase = new ResidentUseCase(residentRepository, jwt);

//controllers
const residentController = new ResidentController(residentUseCase);

const router = Router();

//authentication routes
router.post("/login", (req, res, next) => residentController.login(req, res));
router.post("/logout", (req, res, next) => residentController.logout(req, res));
router.put("/change-password", (req, res, next) => residentController.changePassword(req, res));

export default router;
