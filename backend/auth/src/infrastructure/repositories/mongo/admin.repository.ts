import { IAdminRepository } from "../index";
import IResident from "../../../entities/resident.entity";
import ICaretaker from "../../../entities/caretaker.entity";
import Resident from "./models/resident.model";
import Caretaker from "./models/caretaker.model";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export class AdminRepository implements IAdminRepository {
  async getResidents(): Promise<IResident[]> {
    return Resident.find();
  }

  async addResident(resident: IResident): Promise<IResident> {
    const hashedPassword = await bcrypt.hash(resident.password, SALT_ROUNDS);
    const newResident = new Resident({ ...resident, password: hashedPassword });
    return await newResident.save();
  }

  async blockUnblockResident(residentId: string): Promise<IResident | null> {
    const resident = await Resident.findById(residentId);
    if (!resident) return null;

    return await Resident.findByIdAndUpdate(
      residentId,
      { isBlocked: !resident.isBlocked },
      { new: true }
    );
  }
}