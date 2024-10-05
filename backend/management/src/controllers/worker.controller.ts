import { Request, Response, NextFunction } from "express";
import { WorkerUseCase } from "@/use-cases/worker.use-case";
import { IWorker } from "@/entities/worker.entity";
import { ResponseCreator, NotFoundError, statusCodes } from "@neighbr/common";

export class WorkerController {
  private readonly _workerUseCase: WorkerUseCase;

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
      const newWorker = await this._workerUseCase.createWorker(worker);

      new ResponseCreator()
        .setData(newWorker)
        .setMessage("Worker created successfully")
        .setStatusCode(statusCodes.CREATED)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async updateWorker(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const workerUpdates: Partial<IWorker> = req.body;
      const updatedWorker = await this._workerUseCase.updateWorker(
        id,
        workerUpdates
      );

      if (!updatedWorker) {
        throw new NotFoundError("Worker not found");
      }

      new ResponseCreator()
        .setData(updatedWorker)
        .setMessage("Worker updated successfully")
        .setStatusCode(statusCodes.OK)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async deleteWorker(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      await this._workerUseCase.deleteWorker(id);

      new ResponseCreator()
        .setMessage("Worker deleted successfully")
        .setStatusCode(statusCodes.NO_CONTENT)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getWorkerById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const worker = await this._workerUseCase.getWorkerById(id);

      if (!worker) {
        throw new NotFoundError("Worker not found");
      }

      new ResponseCreator()
        .setData(worker)
        .setStatusCode(statusCodes.OK)
        .sendResponse(res);
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

      new ResponseCreator()
        .setData(workers)
        .setStatusCode(statusCodes.OK)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }
}
