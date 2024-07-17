export interface IVisitor {
  name: string;
  email: string;
  mobileNumber: string;
  apartmentNumber: string;
  image: string;
  hasVehicle: boolean;
  vehicleNumber?: string;
  checkinDate: Date;
  checkinTime: string;
  checkoutTime?: string;
  purpose?: string;
  isApproved: boolean;
  isBlocked: boolean;
}
