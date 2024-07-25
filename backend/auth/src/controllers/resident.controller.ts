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

      if (result.token) {
        res.cookie("neighbr-resident-token", result.token, {
          httpOnly: true,
          secure: true,
          maxAge: 3660000, // 3600000 + 60000 = 1 hour + 1 minute
          sameSite: "none",
        });
        res.status(200).json({
          message: "Login successful",
          resident: result.resident,
        });
      } else {
        res.status(401).json({
          message: result.message,
        });
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

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, currentPassword, newPassword } = req.body;
      const result = await this._residentUsecase.changePassword(
        email,
        currentPassword,
        newPassword
      );

      if (result.success) {
        res.status(200).json({ success: true, message: result.message });
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: "Error during password change", error });
    }
  }
}
