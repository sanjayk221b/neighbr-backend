import { Request, Response, NextFunction } from "express";
import { WorkerUseCase } from "@/use-cases/worker.use-case";
import { IWorker } from "@/entities/worker.entity";
import { ResponseCreator } from "@neighbr/common/dist/utils/response-creator";
import { statusCodes } from "@neighbr/common";
import { BadRequestError } from "@neighbr/common/dist/utils/error-handler";

export class WorkerController {
  private _workerUseCase: WorkerUseCase;

  constructor(workerUseCase: WorkerUseCase) {
    this._workerUseCase = workerUseCase;
  }

  async createWorker(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const worker: IWorker = req.body;
      const file = req.file as Express.Multer.File;
      const newWorker = await this._workerUseCase.createWorker(worker, file);

      const response = new ResponseCreator()
        .setData(newWorker)
        .setStatusCode(statusCodes.CREATED)
        .setMessage("Worker created successfully");
      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getAllWorkers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const workers = await this._workerUseCase.getAllWorkers();

      const response = new ResponseCreator()
        .setData(workers)
        .setStatusCode(statusCodes.OK)
        .setMessage("Workers fetched successfully");
      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async blockOrUnblockWorker(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { isBlocked } = req.body;
      if (typeof isBlocked !== "boolean")
        throw new BadRequestError("Invalid isBlocked value");

      const worker = await this._workerUseCase.blockOrUnblockWorker(
        id,
        isBlocked
      );

      const response = new ResponseCreator()
        .setData(worker)
        .setStatusCode(statusCodes.OK)
        .setMessage(
          `Worker ${isBlocked ? "blocked" : "unblocked"} successfully`
        );
      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async updateWorkerAvailability(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { isAvailable } = req.body;
      if (typeof isAvailable !== "boolean")
        throw new BadRequestError("Invalid isAvailable value");

      const worker = await this._workerUseCase.updateWorkerAvailability(
        id,
        isAvailable
      );

      const response = new ResponseCreator()
        .setData(worker)
        .setStatusCode(statusCodes.OK)
        .setMessage(`Worker availability updated successfully`);
      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }
}
