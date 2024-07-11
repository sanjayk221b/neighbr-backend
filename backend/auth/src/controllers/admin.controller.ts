import { Request, Response, NextFunction } from "express";
import { AdminUseCase } from "../use-cases/admin.use-case";

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
}
