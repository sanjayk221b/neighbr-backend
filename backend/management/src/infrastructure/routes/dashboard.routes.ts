import { Router } from "express";
import { DashboardUseCase } from "@/use-cases/dashboard.use-case";
import { DashboardController } from "@/controllers/dashboard.controller";
import {
  ComplaintsRepository,
  ServicesRepository,
  WorkerRepository,
  VisitorRepository,
  ResidentRepository,
} from "../repositories/mongo";
import { adminAuth, caretakerAuth } from "@neighbr/common";

const complaintsRepository = new ComplaintsRepository();
const servicesRepository = new ServicesRepository();
const workerRepository = new WorkerRepository();
const visitorRepository = new VisitorRepository();
const residentRepository = new ResidentRepository();

const dashboardUseCase = new DashboardUseCase(
  complaintsRepository,
  servicesRepository,
  workerRepository,
  visitorRepository,
  residentRepository
);

const dashboardController = new DashboardController(dashboardUseCase);

const router = Router();

router.get("/admin", adminAuth, (req, res, next) =>
  dashboardController.getAdminDashboardData(req, res, next)
);

router.get("/caretaker", caretakerAuth, (req, res, next) =>
  dashboardController.getCaretakerDashboardData(req, res, next)
);

export default router;
