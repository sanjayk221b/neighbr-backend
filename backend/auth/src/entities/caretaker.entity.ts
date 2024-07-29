export interface ICaretaker {
  _id?: string;
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  isBlocked?: boolean;
  imageUrl?: string;
}
