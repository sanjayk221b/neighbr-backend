import { Router } from "express";
import { JWT } from "../services/jwt";
import { CaretakerRepository } from "../repositories";
import { CaretakerController } from "../../controllers/caretaker.controller";
import { CaretakerUseCase } from "../../use-cases/caretaker.use-case";

//services
const jwt = new JWT();

//repositories
const caretakerRepository = new CaretakerRepository();

//usecases
const caretakerUseCase = new CaretakerUseCase(caretakerRepository, jwt);

//controllers
const caretakerController = new CaretakerController(caretakerUseCase);

const router = Router();

//authentication routes
router.post("/login", (req, res, next) => caretakerController.login(req, res));
router.post("/logout", (req, res, next) => caretakerController.logout(req, res));

export default router;