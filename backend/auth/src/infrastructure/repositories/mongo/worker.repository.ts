import { IWorkerRepository } from "../interfaces/worker-repository.interface";
import Worker from "./models/worker.model";
import { IWorker } from "@/entities/worker.entity";

export class WorkerRepository implements IWorkerRepository {
  async add(worker: IWorker): Promise<IWorker> {
    const newWorker = new Worker(worker);
    return await newWorker.save();
  }

  async update(id: string, worker: Partial<IWorker>): Promise<IWorker | null> {
    return await Worker.findByIdAndUpdate(id, worker, { new: true });
  }

  async findById(id: string): Promise<IWorker | null> {
    return await Worker.findById(id);
  }

  async findAll(): Promise<IWorker[]> {
    return await Worker.find();
  }
}
