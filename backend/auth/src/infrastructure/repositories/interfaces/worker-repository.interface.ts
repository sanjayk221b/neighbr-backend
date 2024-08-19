import { IWorker } from "@/entities/worker.entity";

export interface IWorkerRepository {
  add(worker: IWorker): Promise<IWorker>;
  update(id: string, worker: Partial<IWorker>): Promise<IWorker | null>;
  findById(id: string): Promise<IWorker | null>;
  findAll(): Promise<IWorker[]>;
}
