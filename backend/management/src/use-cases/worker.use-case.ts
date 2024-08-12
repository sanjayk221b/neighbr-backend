import { IWorker } from "@/entities/worker.entity";
import { IWorkerRepository } from "@/infrastructure/repositories/interfaces/worker-repository.inteface";

export class WorkerUseCase {
  private workerRepository: IWorkerRepository;

  constructor(workerRepository: IWorkerRepository) {
    this.workerRepository = workerRepository;
  }

  async createWorker(worker: IWorker): Promise<IWorker> {
    return await this.workerRepository.add(worker);
  }

  async updateWorker(
    id: string,
    worker: Partial<IWorker>
  ): Promise<IWorker | null> {
    return await this.workerRepository.update(id, worker);
  }

  async deleteWorker(id: string): Promise<void> {
    await this.workerRepository.delete(id);
  }

  async getWorkerById(id: string): Promise<IWorker | null> {
    return await this.workerRepository.findById(id);
  }

  async getAllWorkers(): Promise<IWorker[]> {
    return await this.workerRepository.findAll();
  }
}
