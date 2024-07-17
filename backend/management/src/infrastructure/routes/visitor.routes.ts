import { Router } from "express";
import { VisitorUseCase } from "../../use-cases";
import { VisitorController } from "../../controllers";
import { VisitorRepository } from "../repositories/mongo";
import upload from "../middlewares/multer.middleware";
import { Cloudinary } from "../services/cloudinary";
import { EncryptPassword } from "../services/encryptPassword";

//services
const cloudinary = new Cloudinary();
const encryptPassword = new EncryptPassword();

//repositories
const visitorRepository = new VisitorRepository();

//usecases
const visitorUseCase = new VisitorUseCase(visitorRepository, encryptPassword,cloudinary);

//controllers
const visitorController = new VisitorController(visitorUseCase);

const router =  Router();

//visitor management routes
router.post("/create",upload.single("image"), (req, res, next) => visitorController.createVisitor(req, res));
router.get("/", (req, res, next) => visitorController.getVisitors(req, res));
router.post("/:id/update", (req, res, next) => visitorController.updateVisitor(req, res));

export default router; 