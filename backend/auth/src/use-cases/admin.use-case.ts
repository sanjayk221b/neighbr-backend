import { AdminRepository } from "../infrastructure/repositories/mongo";
import { JWT } from "../infrastructure/services/jwt";

export class AdminUseCase {
  private readonly _adminRepository: AdminRepository;
  private readonly _jwt: JWT;

  constructor(AdminRepository: AdminRepository, JWT: JWT) {
    this._adminRepository = AdminRepository;
    this._jwt = JWT;
  }

  async login(email: string, password: string): Promise<string | null> {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      const token = this._jwt.generateToken({ email, role: "admin" });
      return token;
    }
    return null;
  }
}
