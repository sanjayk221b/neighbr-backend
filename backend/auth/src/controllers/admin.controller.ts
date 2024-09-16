import { Request, Response, NextFunction } from "express";
import { AdminUseCase } from "@/use-cases/admin.use-case";
import { IResident, ICaretaker } from "@/entities";
import { ResponseCreator } from "@neighbr/common/dist/utils/response-creator";
import { statusCodes } from "@neighbr/common";
import {
  NotFoundError,
  UnauthorizedError,
} from "@neighbr/common/dist/utils/error-handler";

export class AdminController {
  private readonly _adminUseCase: AdminUseCase;

  constructor(adminUseCase: AdminUseCase) {
    this._adminUseCase = adminUseCase;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await this._adminUseCase.login(email, password);

      if (result.token) {
        res.cookie("neighbr-admin-token", result.token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000 + 60000,
          sameSite: "none",
        });

        const response = new ResponseCreator()
          .setData({ admin: result.admin })
          .setStatusCode(statusCodes.OK)
          .setMessage("Login successful");
        response.sendResponse(res);
      } else {
        throw new UnauthorizedError("Invalid email or password");
      }
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.cookie("neighbr-admin-token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
      });

      const response = new ResponseCreator()
        .setStatusCode(statusCodes.OK)
        .setMessage("Logout successful");
      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getResidents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const residents = await this._adminUseCase.getResidents();

      const response = new ResponseCreator()
        .setData(residents)
        .setStatusCode(statusCodes.OK)
        .setMessage("Residents fetched successfully");
      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async createResident(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const residentData: IResident = req.body;
      const file = req.file as Express.Multer.File;
      const newResident = await this._adminUseCase.addResident(
        residentData,
        file
      );

      const response = new ResponseCreator()
        .setData(newResident)
        .setStatusCode(statusCodes.CREATED)
        .setMessage("Resident created successfully");
      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async blockUnblockResident(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const residentId = req.params.id;
      const updatedResident = await this._adminUseCase.blockUnblockResident(
        residentId
      );

      if (!updatedResident) {
        throw new NotFoundError("Resident not found");
      }

      const response = new ResponseCreator()
        .setData(updatedResident)
        .setStatusCode(statusCodes.OK)
        .setMessage("Resident status updated successfully");
      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getCaretakers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const caretakers = await this._adminUseCase.getCaretakers();

      const response = new ResponseCreator()
        .setData(caretakers)
        .setStatusCode(statusCodes.OK)
        .setMessage("Caretakers fetched successfully");
      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async createCaretaker(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const caretakerData: ICaretaker = req.body;
      const file = req.file as Express.Multer.File;
      const newCaretaker = await this._adminUseCase.addCaretaker(
        caretakerData,
        file
      );

      const response = new ResponseCreator()
        .setData(newCaretaker)
        .setStatusCode(statusCodes.CREATED)
        .setMessage("Caretaker created successfully");
      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async blockUnblockCaretaker(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const caretakerId = req.params.id;
      const updatedCaretaker = await this._adminUseCase.blockUnblockCaretaker(
        caretakerId
      );

      if (!updatedCaretaker) {
        throw new NotFoundError("Caretaker not found");
      }

      const response = new ResponseCreator()
        .setData(updatedCaretaker)
        .setStatusCode(statusCodes.OK)
        .setMessage("Caretaker status updated successfully");
      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }
}
