import { Request, Response, NextFunction } from "express";
import { AdminUseCase } from "../use-cases/admin.use-case";
import { IResident, ICaretaker } from "@/entities";

export class AdminController {
  private readonly _adminUseCase: AdminUseCase;

  constructor(adminUseCase: AdminUseCase) {
    this._adminUseCase = adminUseCase;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this._adminUseCase.login(email, password);

      if (token) {
        res.cookie("neighbr-admin-token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000 + 60000,
        });
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
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
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }

  async getResidents(req: Request, res: Response, next: NextFunction) {
    try {
      const residents = await this._adminUseCase.getResidents();
      res.status(200).json(residents);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while fetching residents", error });
    }
  }

  async createResident(req: Request, res: Response, next: NextFunction) {
    try {
      const residentData: IResident = req.body;
      const file = req.file;
      const newResident = await this._adminUseCase.addResident(
        residentData,
        file
      );

      res.status(201).json(newResident);
    } catch (error) {
      next(error);
    }
  }

  async blockUnblockResident(req: Request, res: Response, next: NextFunction) {
    const residentId = req.params.id;
    try {
      const updatedResident = await this._adminUseCase.blockUnblockResident(
        residentId
      );

      if (!updatedResident) {
        return res.status(404).json({ message: "Resident not found" });
      }

      return res.status(200).json(updatedResident);
    } catch (error) {
      console.error(`Error in blockUnblockResident: ${error}`);
      next(error);
    }
  }

  async getCaretakers(req: Request, res: Response, next: NextFunction) {
    try {
      const caretakers = await this._adminUseCase.getCaretakers();
      res.status(200).json(caretakers);
    } catch (error) {
      next(error);
    }
  }

  async createCaretaker(req: Request, res: Response, next: NextFunction) {
    try {
      const caretakerData: ICaretaker = req.body;
      const file = req.file;
      const newCaretaker = await this._adminUseCase.addCaretaker(
        caretakerData,
        file
      );
      res.status(201).json(newCaretaker);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async blockUnblockCaretaker(req: Request, res: Response, next: NextFunction) {
    const caretakerId = req.params.id;
    try {
      const updatedCaretaker = await this._adminUseCase.blockUnblockCaretaker(
        caretakerId
      );

      if (!updatedCaretaker) {
        return res.status(404).json({ message: "Resident not found" });
      }

      return res.status(200).json(updatedCaretaker);
    } catch (error) {
      next(error);
    }
  }
}
