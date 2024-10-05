import { Request, Response, NextFunction } from "express";
import { ServicesUseCase } from "@/use-cases";
import { ResponseCreator, NotFoundError, statusCodes } from "@neighbr/common";

export class ServicesController {
  private readonly _servicesUseCase: ServicesUseCase;

  constructor(servicesUsecase: ServicesUseCase) {
    this._servicesUseCase = servicesUsecase;
  }

  async addServiceRequest(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const serviceRequestData = req.body;
      const residentId = req.residentId;

      const newService = await this._servicesUseCase.addServiceRequest(
        serviceRequestData,
        residentId
      );

      new ResponseCreator()
        .setData(newService)
        .setMessage("Service request added successfully")
        .setStatusCode(statusCodes.CREATED)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getAllServiceRequests(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const serviceRequests =
        await this._servicesUseCase.getAllServiceRequests();

      if (!serviceRequests || serviceRequests.length === 0) {
        throw new NotFoundError("No service requests found");
      }

      new ResponseCreator()
        .setData(serviceRequests)
        .setStatusCode(statusCodes.OK)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getServiceRequestsByResidentId(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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

      if (!serviceRequests || serviceRequests.length === 0) {
        throw new NotFoundError("No service requests found for the resident");
      }

      new ResponseCreator()
        .setData(serviceRequests)
        .setStatusCode(statusCodes.OK)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async updateServiceRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const serviceId = req.params.id;
      const updateData = req.body;

      const updatedService = await this._servicesUseCase.updateServiceRequests(
        serviceId,
        updateData
      );

      if (!updatedService) {
        throw new NotFoundError(
          "Service request not found or could not be updated"
        );
      }

      new ResponseCreator()
        .setData(updatedService)
        .setMessage("Service request updated successfully")
        .setStatusCode(statusCodes.OK)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }
}
