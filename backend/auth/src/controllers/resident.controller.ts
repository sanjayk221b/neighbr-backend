import { Request, Response, NextFunction } from "express";
import { ResidentUseCase } from "../use-cases/resident.use-case";
import { ResponseCreator, statusCodes } from "@neighbr/common";
import { UnauthorizedError } from "@neighbr/common";

export class ResidentController {
  private readonly _residentUseCase: ResidentUseCase;

  constructor(residentUseCase: ResidentUseCase) {
    this._residentUseCase = residentUseCase;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await this._residentUseCase.login(email, password);

      if (result) {
        const { token, resident } = result;

        res.cookie("neighbr-resident-token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000 + 60000,
          sameSite: "none",
        });

        const responseCreator = new ResponseCreator()
          .setData({ token, resident })
          .setMessage("Login successful")
          .setStatusCode(statusCodes.OK);

        responseCreator.sendResponse(res);
      } else {
        throw new UnauthorizedError("Invalid email or password");
      }
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.cookie("neighbr-resident-token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
      });

      const responseCreator = new ResponseCreator()
        .setMessage("Logout successful")
        .setStatusCode(statusCodes.OK);

      responseCreator.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async changePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, currentPassword, newPassword } = req.body;
      await this._residentUseCase.changePassword(
        email,
        currentPassword,
        newPassword
      );

      const responseCreator = new ResponseCreator()
        .setMessage("Password changed successfully")
        .setStatusCode(statusCodes.OK);

      responseCreator.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }
}
