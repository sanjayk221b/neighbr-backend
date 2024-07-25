import IResident from "../../../entities/resident.entity";
import { IResidentRepository } from "../interfaces/resident-repository.interface";
import Resident from "./models/resident.model";

export class ResidentRepository implements IResidentRepository {
  async getResidentByEmail(email: string): Promise<IResident | null> {
    return Resident.findOne({ email });
  }

  async changeResidentPassword(
    email: string,
    newPassword: string
  ): Promise<boolean> {
    const result = await Resident.updateOne(
      { email },
      { $set: { password: newPassword } }
    );
    return result.modifiedCount > 0;
  }
}
