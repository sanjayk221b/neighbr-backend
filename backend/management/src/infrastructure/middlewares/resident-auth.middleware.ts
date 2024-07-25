import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Resident from "../repositories/mongo/models/resident.model";
import dotenv from "dotenv";
dotenv.config();

const residentAuth = async (req: any, res: Response, next: NextFunction) => {
  let token;

  if (req.cookies && req.cookies["neighbr-resident-token"]) {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined.");
    }
    try {
      token = req.cookies["neighbr-resident-token"];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

      const resident = await Resident.findById(decoded.id).select("-password");
      req.residentId = resident?._id;

      if (!req.residentId) {
        res.status(401);
        throw new Error("Not authorized, resident not found");
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export { residentAuth };
