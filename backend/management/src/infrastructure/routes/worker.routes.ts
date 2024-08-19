import { Router } from "express";
import { WorkerUseCase } from "@/use-cases";
import { WorkerController } from "@/controllers/worker.controller";
import { WorkerRepository } from "../repositories/mongo";
import { upload } from "@neighbr/common";
import { Cloudinary } from "../services/cloudinary";

//services
const cloudinary = new Cloudinary();

//repositories
const workerRepository = new WorkerRepository();

//usecases
const workerUseCase = new WorkerUseCase(workerRepository);

//controller
const workerController = new WorkerController(workerUseCase);

const router = Router();

//worker management routes
router.post("/create", upload.single("image"), (req, res, next) => workerController.createWorker(req, res, next));

export default router;