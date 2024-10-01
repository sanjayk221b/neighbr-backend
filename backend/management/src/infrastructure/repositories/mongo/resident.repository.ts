import { IResident } from "@/entities";
import { IResidentRepository } from "../interfaces/resident-repository.interface";
import Resident from "./models/resident.model";

export class ResidentRepository implements IResidentRepository {
  async getResidentByEmail(email: string): Promise<IResident | null> {
    return Resident.findOne({ email });
  }

  async updateResident(residentData: Partial<IResident>): Promise<IResident> {
    const updatedResident = await Resident.findOneAndUpdate(
      { email: residentData.email },
      residentData,
      { new: true, upsert: true }
    );

    return updatedResident;
  }

  async count(): Promise<number> {
    return Resident.countDocuments({
      $or: [{ isAdmin: false }, { isAdmin: { $exists: false } }],
    });
  }
}
