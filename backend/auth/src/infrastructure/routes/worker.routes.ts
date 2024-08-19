import { Router } from "express";
import { JWT } from "../services/jwt";
import { WorkerController } from "@/controllers/worker.controller";
import { WorkerUseCase } from "@/use-cases/worker.use-case";
import { WorkerRepository } from "../repositories/mongo/worker.repository";
import { upload } from "../middlewares/multer"; 
import S3Uploader from "@neighbr/common/dist/services/s3Bucket";

//services
const s3Uploader = new S3Uploader();

//respositories
const workerRepository = new WorkerRepository();

//usecases
const workerUseCase = new WorkerUseCase(workerRepository, s3Uploader);

//controllers
const workerController = new WorkerController(workerUseCase);

const router = Router();

//worker management routes
router.post("/create", upload.single("image"), (req, res, next) => workerController.createWorker(req, res, next));
router.get("/", (req, res, next) => workerController.getAllWorkers(req, res, next));
router.patch("/:id/block-unblock", (req, res, next) => workerController.blockOrUnblockWorker(req, res, next));
router.patch("/:id/availability", (req, res, next) => workerController.updateWorkerAvailability(req, res, next))

export default router;