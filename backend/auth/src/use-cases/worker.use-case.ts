import { IWorker } from "@/entities/worker.entity";
import { IWorkerRepository } from "@/infrastructure/repositories/interfaces/worker-repository.interface";
import S3Uploader, { IFile } from "@neighbr/common/dist/services/s3Bucket";
import { NotFoundError } from "@neighbr/common/dist/utils/error-handler";

export class WorkerUseCase {
  private readonly _workerRepository: IWorkerRepository;
  private readonly _s3Uploader: S3Uploader;

  constructor(workerRepository: IWorkerRepository, s3Uploader: S3Uploader) {
    this._workerRepository = workerRepository;
    this._s3Uploader = s3Uploader;
  }

  async createWorker(
    worker: IWorker,
    file: Express.Multer.File
  ): Promise<IWorker> {
    console.log(file);
    const fileToUpload: IFile = {
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      buffer: file.buffer,
      size: file.size,
    };

    const imageName = await this._s3Uploader.uploadFile(
      fileToUpload,
      fileToUpload.originalname
    );
    worker.imageUrl = imageName;

    return await this._workerRepository.add(worker);
  }

  async getAllWorkers(): Promise<IWorker[]> {
    const workers = await this._workerRepository.findAll();

    for (const worker of workers) {
      if (worker.imageUrl) {
        worker.imageUrl = await this._s3Uploader.retrieveFile(worker.imageUrl);
      }
    }
    return workers;
  }

  async updateWorker(id: string, updates: Partial<IWorker>): Promise<IWorker> {
    const updatedWorker = await this._workerRepository.update(id, updates);

    if (!updatedWorker) throw new NotFoundError("Worker not found");
    return updatedWorker;
  }

  async blockOrUnblockWorker(id: string, isBlocked: boolean): Promise<IWorker> {
    return await this.updateWorker(id, { isBlocked });
  }

  async updateWorkerAvailability(
    id: string,
    isAvailable: boolean
  ): Promise<IWorker> {
    return await this.updateWorker(id, { isAvailable });
  }
}
