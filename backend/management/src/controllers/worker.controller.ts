import { Request, Response, NextFunction } from "express";
import { WorkerUseCase } from "@/use-cases/worker.use-case";
import { IWorker } from "@/entities/worker.entity";

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
      console.log("request recieved for creating new worker", req.body);
      console.log(req.file);
      const worker: IWorker = req.body;
      const newWorker = await this._workerUseCase.createWorker(worker);
      res.status(201).json(newWorker);
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
      if (updatedWorker) {
        res.status(200).json(updatedWorker);
      } else {
        res.status(404).json({ message: "Worker not found" });
      }
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
      res.status(204).send();
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
      if (worker) {
        res.status(200).json(worker);
      } else {
        res.status(404).json({ message: "Worker not found" });
      }
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
      res.status(200).json(workers);
    } catch (error) {
      next(error);
    }
  }
}
