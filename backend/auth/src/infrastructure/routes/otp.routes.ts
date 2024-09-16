import { Router } from "express";
import { OTPController } from "@/controllers";
import { OTPUseCase } from "@/use-cases/otp.use-case";
import {
  OTPRepository,
  ResidentRepository,
  CaretakerRepository,
} from "../repositories";

// Repositories
const otpRepository = new OTPRepository();
const residentRepository = new ResidentRepository();
const caretakerRepository = new CaretakerRepository();

// Use cases
const otpUseCase = new OTPUseCase(
  otpRepository,
  residentRepository,
  caretakerRepository
);

// Controllers
const otpController = new OTPController(otpUseCase);

const router = Router();

// OTP routes
router.post("/send", (req, res, next) =>
  otpController.sendOTP(req, res, next)
);
router.post("/verify", (req, res, next) =>
  otpController.verifyOTP(req, res, next)
);

export default router;
