import { Request, Response, NextFunction } from "express";
import { ServicesUseCase } from "@/use-cases";

export class ServicesController {
  private readonly _servicesUseCase: ServicesUseCase;

  constructor(servicesUsecase: ServicesUseCase) {
    this._servicesUseCase = servicesUsecase;
  }

  async addServiceRequest(req: any, res: Response, next: NextFunction) {
    try {
      const serviceRequestData = req.body;
      const residentId = req.residentId;

      const newService = await this._servicesUseCase.addServiceRequest(
        serviceRequestData,
        residentId
      );

      res.status(201).json({
        message: "Service request added successfully",
        service: newService,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllServiceRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceRequests =
        await this._servicesUseCase.getAllServiceRequests();
      res.status(200).json(serviceRequests);
    } catch (error) {
      next(error);
    }
  }

  async getServiceRequestsByResidentId(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;
      const residentId = req.residentId;
      const serviceRequests =
        await this._servicesUseCase.getServiceRequestsByResidentId(
          residentId,
          parseInt(page as string),
          parseInt(limit as string),
          search as string
        );

      res.status(200).json(serviceRequests);
    } catch (error: any) {
      next(error);
    }
  }
  async updateServiceRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceId = req.params.id;
      const updateData = req.body;

      const updatedService = await this._servicesUseCase.updateServiceRequests(
        serviceId,
        updateData
      );

      res.status(200).json({
        message: "Service request updated successfully",
        service: updatedService,
      });
    } catch (error) {
      next(error);
    }
  }
}
