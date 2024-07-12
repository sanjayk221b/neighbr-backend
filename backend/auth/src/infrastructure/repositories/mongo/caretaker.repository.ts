import ICaretaker from "../../../entities/caretaker.entity";
import { ICaretakerRepository } from "../interfaces/caretaker-repository.interface";
import Caretaker from "./models/caretaker.model";

export class CaretakerRepository implements ICaretakerRepository {
  async getCaretakerByEmail(email: string): Promise<ICaretaker | null> {
    return Caretaker.findOne({ email });
  }
}
