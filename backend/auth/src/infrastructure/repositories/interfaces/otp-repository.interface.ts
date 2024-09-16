import { IOTP } from "@/entities";

export interface IOTPRepository {
  save(otp: IOTP): Promise<IOTP>;
  findByEmail(email: string, userType: string): Promise<IOTP | null>;
  verify(email: string, otp: string, userType: string): Promise<boolean>;
}
