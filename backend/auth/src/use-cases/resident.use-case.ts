import { ResidentRepository } from "../infrastructure/repositories";
import bcrypt from "bcrypt";
import { JWT } from "../infrastructure/services/jwt";

export class ResidentUseCase {
  private readonly _residentRepository: ResidentRepository;
  private readonly _jwt: JWT;

  constructor(ResidentRepository: ResidentRepository, JWT: JWT) {
    this._residentRepository = ResidentRepository;
    this._jwt = JWT;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; data: string }> {
    const resident = await this._residentRepository.getResidentByEmail(email);

    if (!resident) {
      return { success: false, data: "User not found" };
    }

    if (await bcrypt.compare(password, resident.password)) {
      const token = this._jwt.generateToken({
        id: resident.email,
        role: "resident",
      });
      return { success: true, data: token };
    }

    return { success: false, data: "Invalid password" };
  }
}