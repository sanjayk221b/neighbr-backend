import { Request, Response, NextFunction } from "express";
import { ResidentUseCase } from "../use-cases/resident.use-case";

export class ResidentController {
  private readonly _residentUsecase: ResidentUseCase;

  constructor(ResidentUseCase: ResidentUseCase) {
    this._residentUsecase = ResidentUseCase;
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await this._residentUsecase.login(email, password);

      if (result.success) {
        res.cookie("neighbr-user-token", result.data, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000 + 60000,
          sameSite: "none",
        });
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: result.data });
      }
    } catch (error) {
      res.status(500).json({ message: "Error during login", error });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.cookie("neighbr-user-token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: "Error during logout", error });
    }
  }
}
