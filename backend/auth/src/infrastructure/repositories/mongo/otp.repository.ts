import { IOTPRepository } from "../interfaces/otp-repository.interface";
import Otp from "./models/otp.model";
import { IOTP } from "@/entities";

export class OTPRepository implements IOTPRepository {
  async save(otp: IOTP): Promise<IOTP> {
    const otpDocument = new Otp(otp);
    return await otpDocument.save();
  }

  async findByEmail(email: string): Promise<IOTP | null> {
    return await Otp.findOne({ email }).exec();
  }

  async verify(email: string, otp: string): Promise<boolean> {
    const otpRecord = await Otp.findOne({ email, otp }).exec();
    if (!otpRecord) return false;

    const currentTime = new Date();
    if (otpRecord.expiresAt && otpRecord.expiresAt > currentTime) {
      return true;
    }
    return false;
  }
}

export default OTPRepository;
