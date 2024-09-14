import {
  IOTPRepository,
  IResidentRepository,
  ICaretakerRepository,
} from "@/infrastructure/repositories";
import { UnauthorizedError } from "@neighbr/common";

export class OTPUseCase {
  private readonly _otpRepository: IOTPRepository;
  private readonly _residentRepository: IResidentRepository;
  private readonly _caretakerRepository: ICaretakerRepository;

  constructor(
    otpRepository: IOTPRepository,
    residentRepository: IResidentRepository,
    caretakerRepository: ICaretakerRepository
  ) {
    this._otpRepository = otpRepository;
    this._residentRepository = residentRepository;
    this._caretakerRepository = caretakerRepository;
  }

  async generateOTP(email: string): Promise<void> {
    const resident = await this._residentRepository.getResidentByEmail(email);
    const caretaker = await this._caretakerRepository.getCaretakerByEmail(
      email
    );

    if (!resident && !caretaker) {
      throw new UnauthorizedError("User not found");
    }

    await this._otpRepository.save({
      email,
      otp: this.generateRandomOTP(),
    });
  }

  // Verify OTP for a user
  async verifyOTP(email: string, otp: string): Promise<boolean> {
    const resident = await this._residentRepository.getResidentByEmail(email);
    const caretaker = await this._caretakerRepository.getCaretakerByEmail(
      email
    );

    if (!resident && !caretaker) {
      throw new UnauthorizedError("User not found");
    }

    // Verify OTP from OTP repository
    const isValid = await this._otpRepository.verify(email, otp);
    if (!isValid) {
      throw new UnauthorizedError("Invalid or expired OTP");
    }

    return true;
  }

  private generateRandomOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Example: 6-digit OTP
  }
}
