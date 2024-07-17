export interface IResident {
    name: string;
    email: string;
    mobileNumber: string;
    apartmentNumber: string;
    password: string;
    isBlocked?: boolean;
    hasVehicle?: boolean;
    vehicles?: [string];
    image?: string;
  }