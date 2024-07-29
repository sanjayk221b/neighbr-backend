import { ICaretaker } from "@/entities";
import { CaretakerRepository } from "../infrastructure/repositories/mongo/";
import bcrypt from "bcrypt";
import { JWT } from "../infrastructure/services/jwt";

export class CaretakerUseCase {
  private readonly _caretakerRepository: CaretakerRepository;
  private readonly _jwt: JWT;

  constructor(CaretakerRepository: CaretakerRepository, JWT: JWT) {
    this._caretakerRepository = CaretakerRepository;
    this._jwt = JWT;
  }

  async login(email: string, password: string): Promise<string | null> {
    const caretaker = await this._caretakerRepository.getCaretakerByEmail(
      email
    );

    if (caretaker && (await bcrypt.compare(password, caretaker.password))) {
      const token = this._jwt.generateToken({
        id: caretaker.email,
        role: "caretaker",
      });
      return token;
    }
    return null;
  }
}
