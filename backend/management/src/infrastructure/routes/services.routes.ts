import { Router } from "express";
import { ServicesUseCase } from "../../use-cases/services.use-case";
import { ServicesRepository } from "../repositories/mongo/services.repository";
import { ServicesController } from "../../controllers/services.controller";
import { residentAuth } from "../middlewares/resident-auth.middleware";
import upload from "../middlewares/multer.middleware";

//respositories
const servicesRepository = new ServicesRepository();

//usecases
const servicesUseCase = new ServicesUseCase(servicesRepository);

//controllers
const servicesController = new ServicesController(servicesUseCase);

const router = Router();

router.post("/request",upload.single("image"), residentAuth, (req, res, next) => servicesController.addServiceRequest(req, res, next));
router.get("/requests",residentAuth, (req, res, next) => servicesController.getServiceRequestsByResidentId(req, res, next));
router.get("/requests/all", (req, res, next) => servicesController.getAllServiceRequests(req, res, next));
router.put("/requests/:id/update", (req, res, next) => servicesController.updateServiceRequest(req, res, next));



export default router;
