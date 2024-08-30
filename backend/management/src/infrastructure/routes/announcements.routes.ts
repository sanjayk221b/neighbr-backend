import { Router } from "express";
import { AnnouncementsUseCase } from "@/use-cases/announcements.use-case";
import { AnnouncementsController } from "@/controllers/announcements.controller";
import { AnnouncementRepository } from "../repositories/mongo/Announcement.repository"; 

// Repositories
const announcementRepository = new AnnouncementRepository();

// Use Cases
const announcementsUseCase = new AnnouncementsUseCase(announcementRepository);

// Controllers
const announcementsController = new AnnouncementsController(announcementsUseCase);

const router = Router();

// Announcements management routes
router.post("/create", (req, res, next) => announcementsController.createAnnouncement(req, res, next));
router.get("/", (req, res, next) => announcementsController.getAllAnnouncements(req, res, next));

export default router;
