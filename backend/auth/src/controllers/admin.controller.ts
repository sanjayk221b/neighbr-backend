import { Request, Response, NextFunction } from "express";
import { AdminUseCase } from "../use-cases/admin.use-case";
import IResident from "../entities/resident.entity";
import ICaretaker from "../entities/caretaker.entity";

export class AdminController {
  private readonly _adminUseCase: AdminUseCase;

  constructor(adminUseCase: AdminUseCase) {
    this._adminUseCase = adminUseCase;
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

  async blockUnblockResident(req: Request, res: Response) {
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
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getCaretakers(req: Request, res: Response) {
    try {
      const caretakers = await this._adminUseCase.getCaretakers();
      res.status(200).json(caretakers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching the caretakers", error });
    }
  }

  async createCaretaker(req: Request, res: Response) {
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
      res.status(500).json({ message: "Error creating caretaker", error });
    }
  }

  async blockUnblockCaretaker(req: Request, res: Response) {
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
      console.log(error);
    }
  }
}
