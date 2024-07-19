import { Router } from "express";
import { ComplaintsUseCase } from "../../use-cases/complaints.use-case";
import { ComplaintsRepository } from "../repositories/mongo/complaints.repository";
import { ComplaintsController } from "../../controllers/complaints.controller";
import { residentAuth } from "../middlewares/resident-auth.middleware";
import upload from "../middlewares/multer.middleware";
import { Cloudinary } from "../services/cloudinary"; 

//services
const cloudinary = new Cloudinary();

//respositories
const complaintsRepository = new ComplaintsRepository();

//usecases
const complaintsUseCase = new ComplaintsUseCase(complaintsRepository, cloudinary);

//controllers
const complaintsController = new ComplaintsController(complaintsUseCase);

const router = Router();

router.post("/create",residentAuth,upload.single("image"), (req, res, next) => complaintsController.addComplaint(req, res, next));
router.get("/",residentAuth, (req, res, next) => complaintsController.getComplaintsByResident(req, res, next));
router.get("/all", (req, res, next) => complaintsController.getAllComplaints(req, res, next));
// router.put("/:id/update", (req, res, next) => complaintsController.)


export default router;
