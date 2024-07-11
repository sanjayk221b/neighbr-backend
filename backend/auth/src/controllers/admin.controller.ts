import { Request, Response, NextFunction } from "express";
import { AdminUseCase } from "../use-cases/admin.use-case";
import IResident from "../entities/resident.entity";

export class AdminController {
  private _adminUseCase: AdminUseCase;

  constructor(AdminUseCase: AdminUseCase) {
    this._adminUseCase = AdminUseCase;
  }

  async login(req: Request, res: Response): Promise<void> {
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
      res.status(500).json({ message: "Error during login", error });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.cookie("neighbr-admin-token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: "Error during logout", error });
    }
  }

  async getResidents(req: Request, res: Response) {
    try {
      const residents = await this._adminUseCase.getResidents();
      res.status(200).json(residents);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while fetching residents", error });
    }
  }

  async createResident(req: Request, res: Response) {
    try {
      const residentData: IResident = req.body;
      const file = req.file;
      const newResident = await this._adminUseCase.addResident(
        residentData,
        file
      );

      res.status(201).json(newResident);
    } catch (error) {
      res.status(500).json({ message: "Error while creating resident", error });
    }
  }
}
