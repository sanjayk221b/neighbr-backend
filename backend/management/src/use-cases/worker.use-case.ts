import { IWorker } from "@/entities/worker.entity";
import { IWorkerRepository } from "@/infrastructure/repositories/interfaces/worker-repository.inteface";

export class WorkerUseCase {
  private _workerRepository: IWorkerRepository;

  constructor(workerRepository: IWorkerRepository) {
    this._workerRepository = workerRepository;
  }

  async createWorker(worker: IWorker): Promise<IWorker> {
    return await this._workerRepository.add(worker);
  }

  async updateWorker(
    id: string,
    worker: Partial<IWorker>
  ): Promise<IWorker | null> {
    return await this._workerRepository.update(id, worker);
  }

  async deleteWorker(id: string): Promise<void> {
    await this._workerRepository.delete(id);
  }

  async getWorkerById(id: string): Promise<IWorker | null> {
    return await this._workerRepository.findById(id);
  }

  async getAllWorkers(): Promise<IWorker[]> {
    return await this._workerRepository.findAll();
  }
}
