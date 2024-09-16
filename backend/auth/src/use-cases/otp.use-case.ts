import {
  IOTPRepository,
  IResidentRepository,
  ICaretakerRepository,
} from "@/infrastructure/repositories";
import { UnauthorizedError, BadRequestError } from "@neighbr/common";

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

  async generateOTP(email: string, userType: string): Promise<void> {
    let user;
    if (userType === "resident") {
      user = await this._residentRepository.getResidentByEmail(email);
    } else if (userType === "caretaker") {
      user = await this._caretakerRepository.getCaretakerByEmail(email);
    } else {
      throw new BadRequestError("Invalid user type");
    }

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    await this._otpRepository.save({
      email,
      otp: this.generateRandomOTP(),
      userType,
    });
  }

  async verifyOTP(
    email: string,
    otp: string,
    userType: string
  ): Promise<boolean> {
    let user;
    if (userType === "resident") {
      user = await this._residentRepository.getResidentByEmail(email);
    } else if (userType === "caretaker") {
      user = await this._caretakerRepository.getCaretakerByEmail(email);
    } else {
      throw new BadRequestError("Invalid user type");
    }

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const isValid = await this._otpRepository.verify(email, otp, userType);
    if (!isValid) {
      throw new UnauthorizedError("Invalid or expired OTP");
    }

    return true;
  }

  private generateRandomOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
