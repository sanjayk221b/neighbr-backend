import { Request, Response, NextFunction } from "express";
import { CaretakerUseCase } from "../use-cases/caretaker.use-case";
import { ResponseCreator, statusCodes } from "@neighbr/common";
import { UnauthorizedError, BadRequestError } from "@neighbr/common";

export class CaretakerController {
  private readonly _caretakerUseCase: CaretakerUseCase;

  constructor(caretakerUseCase: CaretakerUseCase) {
    this._caretakerUseCase = caretakerUseCase;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await this._caretakerUseCase.login(email, password);

      if (result) {
        const { token, caretaker } = result;

        res.cookie("neighbr-caretaker-token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000 + 60000,
          sameSite: "none",
        });

        const responseCreator = new ResponseCreator()
          .setData({ token, caretaker })
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
      res.cookie("neighbr-caretaker-token", "", {
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
      await this._caretakerUseCase.changeCaretakerPassword(
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
