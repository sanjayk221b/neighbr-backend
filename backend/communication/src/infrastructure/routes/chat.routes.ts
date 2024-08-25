import { Router } from "express";
import { ChatUseCase } from "@/use-cases"; 
import { ChatController } from "@/controllers";
import { ChatRepository, ResidentRepository } from "@/infrastructure/repositories/mongo";
import { SocketService } from "@/infrastructure/services/socket"; 
import { upload } from "../middlewares/multer";
import { S3Uploader } from "@neighbr/common";

// Services
const socketService = new SocketService();
const s3Uploader = new S3Uploader()

// Repositories
const chatRepository = new ChatRepository();
const residentRepository = new ResidentRepository();

// Use cases
const chatUseCase = new ChatUseCase(chatRepository, socketService, residentRepository, s3Uploader);

// Controllers
const chatController = new ChatController(chatUseCase);

const router = Router();

// Chat routes
router.post("/conversations/create", (req, res, next) => chatController.createConversation(req, res, next));
router.get("/conversations/:userId", (req, res, next) => chatController.getConversations(req, res, next));
router.post("/messages/create", upload.single("file"), (req, res, next) => chatController.sendMessage(req, res, next));
router.get("/messages/:conversationId", (req, res, next) => chatController.getMessages(req, res, next));
router.get("/users",(req, res, next) => chatController.getUsers(req, res, next));

export default router;