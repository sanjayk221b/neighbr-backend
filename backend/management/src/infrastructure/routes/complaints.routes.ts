import { Router } from "express";
import { ComplaintsUseCase } from "../../use-cases/complaints.use-case";
import { ComplaintsRepository } from "../repositories/mongo/complaint.repository";
import { ComplaintsController } from "../../controllers/complaints.controller";
import { residentAuth } from "@neighbr/common/dist/middlewares/resident-auth.middleware";
import {upload} from "@neighbr/common"
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
router.get("/all/caretaker", (req, res, next) => complaintsController.getComplaintsByCaretaker(req, res, next));
router.get("/all/admin", (req, res, next) => complaintsController.getComplaintsByAdmin(req, res, next));
router.put("/update", (req, res, next) => complaintsController.updateComplaint(req, res, next));


export default router;
