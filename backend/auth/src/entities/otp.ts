export interface IOTP {
  email: string;
  otp: string;
  expiresAt?: Date;
  userType: string;
}
