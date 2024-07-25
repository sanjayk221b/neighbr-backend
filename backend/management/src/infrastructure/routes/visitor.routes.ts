import { Router } from "express";
import { VisitorUseCase } from "../../use-cases";
import { VisitorController } from "../../controllers";
import { VisitorRepository } from "../repositories/mongo";
import upload from "../middlewares/multer.middleware";
import { Cloudinary } from "../services/cloudinary";
import { residentAuth } from "../middlewares/resident-auth.middleware";

//services
const cloudinary = new Cloudinary();

//repositories
const visitorRepository = new VisitorRepository();

//usecases
const visitorUseCase = new VisitorUseCase(visitorRepository,cloudinary);

//controllers
const visitorController = new VisitorController(visitorUseCase);

const router =  Router();

//visitor management routes
router.post("/create",upload.single("image"), (req, res, next) => visitorController.createVisitor(req, res, next));
router.get("/", (req, res, next) => visitorController.getVisitors(req, res, next));
router.get("/all",residentAuth, (req, res, next) => visitorController.getVisitorsByResidentId(req, res, next));
router.post("/:id/update", (req, res, next) => visitorController.updateVisitor(req, res, next));

export default router;  