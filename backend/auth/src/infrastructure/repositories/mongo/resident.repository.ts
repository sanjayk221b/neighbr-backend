import { IResident } from "@/entities";
import { IResidentRepository } from "../interfaces/resident-repository.interface";
import Resident from "./models/resident.model";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export class ResidentRepository implements IResidentRepository {
  async getResidents(
    page: number,
    limit: number,
    search: string = ""
  ): Promise<{ data: IResident[]; totalPages: number }> {
    const skip = (page - 1) * limit;

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const [residents, total] = await Promise.all([
      Resident.find(query).skip(skip).limit(limit).exec(),
      Resident.countDocuments(query),
    ]);

    return {
      data: residents,
      totalPages: Math.ceil(total / limit),
    };
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

  async findAdminByEmail(email: string): Promise<IResident | null> {
    return await Resident.findOne({ email, isAdmin: true });
  }
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

  async count(): Promise<number> {
    return Resident.countDocuments({
      $or: [{ isAdmin: false }, { isAdmin: { $exists: false } }],
    });
  }
}
