import { ICaretaker } from "@/entities";
import { CaretakerRepository } from "../infrastructure/repositories/mongo/";
import bcrypt from "bcrypt";
import { JWT } from "../infrastructure/services/jwt";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@neighbr/common";

const SALT_ROUNDS = 10;

export class CaretakerUseCase {
  private readonly _caretakerRepository: CaretakerRepository;
  private readonly _jwt: JWT;

  constructor(caretakerRepository: CaretakerRepository, jwt: JWT) {
    this._caretakerRepository = caretakerRepository;
    this._jwt = jwt;
  }

  async login(
    email: string,
    password: string
  ): Promise<{
    token: string;
    caretaker: Partial<Omit<ICaretaker, "password">>;
  } | null> {
    const caretaker = await this._caretakerRepository.getCaretakerByEmail(
      email
    );

    if (caretaker && (await bcrypt.compare(password, caretaker.password))) {
      const token = this._jwt.generateToken({
        id: caretaker._id,
        role: "caretaker",
      });

      const caretakerDetails: Partial<Omit<ICaretaker, "password">> = {
        _id: caretaker._id,
        name: caretaker.name,
        email: caretaker.email,
        mobileNumber: caretaker.mobileNumber,
        isBlocked: caretaker.isBlocked,
        image: caretaker.image,
      };

      return {
        token,
        caretaker: caretakerDetails,
      };
    }

    return null;
  }

  async changeCaretakerPassword(
    email: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const caretaker = await this._caretakerRepository.getCaretakerByEmail(
      email
    );

    if (!caretaker) {
      throw new NotFoundError("Caretaker not found");
    }

    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      caretaker.password
    );
    if (!isPasswordMatch) {
      throw new BadRequestError("Current password is incorrect");
    }

    await this._caretakerRepository.changeCaretakerPassword(email, newPassword);
  }
}
