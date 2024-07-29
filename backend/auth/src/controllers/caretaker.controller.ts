import { Request, Response, NextFunction } from "express";
import { CaretakerUseCase } from "../use-cases/caretaker.use-case";

export class CaretakerController {
  private readonly _caretakerUseCase: CaretakerUseCase;

  constructor(CaretakerUseCase: CaretakerUseCase) {
    this._caretakerUseCase = CaretakerUseCase;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this._caretakerUseCase.login(email, password);

      if (token) {
        res.cookie("neighbr-caretaker-token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000 + 60000,
          sameSite: "none",
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
      res.cookie("neighbr-caretaker-token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }
}
