import { ICaretaker } from "@/entities";
import { ICaretakerRepository } from "../interfaces/caretaker-repository.interface";
import Caretaker from "./models/caretaker.model";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export class CaretakerRepository implements ICaretakerRepository {
  async getCaretakerByEmail(email: string): Promise<ICaretaker | null> {
    return Caretaker.findOne({ email });
  }

  async changeCaretakerPassword(
    email: string,
    newPassword: string
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await Caretaker.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );
  }
}
