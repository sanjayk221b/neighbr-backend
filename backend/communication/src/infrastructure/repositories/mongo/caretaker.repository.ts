import { ICaretaker } from "@/entities";
import { ICaretakerRepository } from "../interfaces/caretaker-repository.interface";
import Caretaker from "./models/caretaker.model";

export class CaretakerRepository implements ICaretakerRepository {
  async getCaretakerByEmail(email: string): Promise<ICaretaker | null> {
    return Caretaker.findOne({ email });
  }

  async updateCaretaker(
    caretakerData: Partial<ICaretaker>
  ): Promise<ICaretaker> {
    const updatedCaretaker = await Caretaker.findOneAndUpdate(
      { email: caretakerData.email },
      caretakerData,
      { new: true, upsert: true }
    );

    return updatedCaretaker;
  }
}
