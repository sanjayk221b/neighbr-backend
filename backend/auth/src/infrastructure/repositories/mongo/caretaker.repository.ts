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
  async getCaretakers(): Promise<ICaretaker[]> {
    return Caretaker.find();
  }

  async addCaretaker(caretaker: ICaretaker): Promise<ICaretaker> {
    const hashedPassword = await bcrypt.hash(caretaker.password, SALT_ROUNDS);
    const newCaretaker = new Caretaker({
      ...caretaker,
      password: hashedPassword,
    });
    return await newCaretaker.save();
  }

  async blockUnblockCaretakers(
    caretakerId: string
  ): Promise<ICaretaker | null> {
    const caretaker = await Caretaker.findById(caretakerId);
    if (!caretaker) return null;

    return await Caretaker.findByIdAndUpdate(
      caretakerId,
      { isBlocked: !caretaker.isBlocked },
      { new: true }
    );
  }

  async count(): Promise<number> {
    return Caretaker.countDocuments();
  }
}
