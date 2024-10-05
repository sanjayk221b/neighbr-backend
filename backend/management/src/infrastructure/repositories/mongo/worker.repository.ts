import { IWorkerRepository } from "../interfaces/worker-repository.inteface";
import Worker from "./models/worker.model";
import { IWorker } from "@/entities/worker.entity";

export class WorkerRepository implements IWorkerRepository {
  async add(worker: IWorker): Promise<IWorker> {
    const newWorker = new Worker(worker);
    return await newWorker.save();
  }

  async update(id: string, worker: Partial<IWorker>): Promise<IWorker | null> {
    return await Worker.findByIdAndUpdate(id, worker, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await Worker.findByIdAndDelete(id).exec();
  }

  async findById(id: string): Promise<IWorker | null> {
    return await Worker.findById(id).exec();
  }

  async findAll(): Promise<IWorker[]> {
    return await Worker.find().exec();
  }

  async count(): Promise<number> {
    return Worker.countDocuments();
  }
}
