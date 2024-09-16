import { Request, Response, NextFunction } from "express";
import { OTPUseCase } from "@/use-cases/otp.use-case";
import { ResponseCreator, statusCodes } from "@neighbr/common";

export class OTPController {
  private readonly _otpUseCase: OTPUseCase;

  constructor(otpUseCase: OTPUseCase) {
    this._otpUseCase = otpUseCase;
  }

  async sendOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, userType } = req.body;
      await this._otpUseCase.generateOTP(email, userType);

      const responseCreator = new ResponseCreator()
        .setMessage("OTP sent successfully")
        .setStatusCode(statusCodes.OK);
      responseCreator.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async verifyOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, otp, userType } = req.body;
      const isValid = await this._otpUseCase.verifyOTP(email, otp, userType);

      if (isValid) {
        const responseCreator = new ResponseCreator()
          .setMessage("OTP verified successfully")
          .setStatusCode(statusCodes.OK);
        responseCreator.sendResponse(res);
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      next(error);
    }
  }
}
