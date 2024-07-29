import { ResidentRepository } from "../infrastructure/repositories";
import bcrypt from "bcrypt";
import { JWT } from "../infrastructure/services/jwt";
import { IResident } from "@/entities";

export class ResidentUseCase {
  private readonly _residentRepository: ResidentRepository;
  private readonly _jwt: JWT;

  constructor(ResidentRepository: ResidentRepository, JWT: JWT) {
    this._residentRepository = ResidentRepository;
    this._jwt = JWT;
  }

  async login(
    email: string,
    password: string
  ): Promise<{
    message: string;
    token?: string;
    resident?: Partial<IResident>;
  }> {
    const resident = await this._residentRepository.getResidentByEmail(email);

    if (!resident) {
      return { message: "Resident not found" };
    }

    if (resident.isBlocked) {
      return {
        message: "Your account is blocked. Please contact the administration.",
      };
    }

    const passwordMatch = await bcrypt.compare(password, resident.password);
    if (!passwordMatch) {
      return { message: "Invalid password" };
    }

    const token = this._jwt.generateToken({
      id: resident._id,
      role: "resident",
    });

    const residentDetails: Partial<IResident> = {
      _id: resident._id,
      name: resident.name,
      email: resident.email,
      mobileNumber: resident.mobileNumber,
      apartmentNumber: resident.apartmentNumber,
      isBlocked: resident.isBlocked,
      hasVehicle: resident.hasVehicle,
      vehicles: resident.vehicles,
      image: resident.image,
    };

    return {
      message: "Login successful",
      token: token,
      resident: residentDetails,
    };
  }

  async changePassword(
    email: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string; success: boolean }> {
    const resident = await this._residentRepository.getResidentByEmail(email);

    if (!resident) {
      return { message: "Resident not found", success: false };
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      resident.password
    );
    if (!passwordMatch) {
      return { message: "Current password is incorrect", success: false };
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    const passwordChanged =
      await this._residentRepository.changeResidentPassword(
        email,
        hashedNewPassword
      );

    if (passwordChanged) {
      return { message: "Password changed successfully", success: true };
    } else {
      return { message: "Failed to change password", success: false };
    }
  }
}
