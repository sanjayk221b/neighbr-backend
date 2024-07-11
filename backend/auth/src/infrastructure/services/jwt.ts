import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export class JWT {
  generateToken(payload: object, expiresIn = "1h"): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.log(error);
    }
  }
}
