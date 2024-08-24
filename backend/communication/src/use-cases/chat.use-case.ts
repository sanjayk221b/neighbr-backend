import { IMessage, IConversation, IParticipant, IResident } from "@/entities";
import {
  IChatRepository,
  IResidentRepository,
} from "@/infrastructure/repositories/interfaces";
import { SocketService } from "@/infrastructure/services/socket";
import { S3Uploader } from "@neighbr/common";

export class ChatUseCase {
  private readonly _chatRepository: IChatRepository;
  private readonly _socketService: SocketService;
  private readonly _residentRepository: IResidentRepository;
  private readonly _s3Uploader: S3Uploader;

  constructor(
    chatRepository: IChatRepository,
    socketService: SocketService,
    residentRepository: IResidentRepository,
    s3Uploader: S3Uploader
  ) {
    this._chatRepository = chatRepository;
    this._socketService = socketService;
    this._residentRepository = residentRepository;
    this._s3Uploader = s3Uploader;
  }

  async createConversation(
    participants: IParticipant[],
    isGroup: boolean,
    groupName?: string
  ): Promise<IConversation> {
    const conversation: IConversation = {
      participants,
      isGroup,
      groupName,
    };
    return await this._chatRepository.createConversation(conversation);
  }

  async getConversations(userId: string): Promise<IConversation[]> {
    const conversations = await this._chatRepository.getConversationsByUserId(
      userId
    );
    return conversations;
  }

  async sendMessage(
    message: Partial<IMessage>,
    file?: Express.Multer.File
  ): Promise<IMessage> {
    let mediaUrl: string | undefined;
    let mediaType: "image" | "document" | "none" = "none";

    if (file) {
      try {
        const fileName = await this._s3Uploader.uploadFile(
          file,
          file.originalname
        );
        mediaUrl = fileName; // Store only the file name in the database
        mediaType = file.mimetype.startsWith("image/") ? "image" : "document";
      } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Failed to upload file");
      }
    }

    const fullMessage: IMessage = {
      ...message,
      mediaType,
      mediaUrl, // Store the file name in the database, not the pre-signed URL
    } as IMessage;

    const savedMessage = await this._chatRepository.createMessage(fullMessage);

    // Optionally, generate the pre-signed URL when sending the message
    if (savedMessage.mediaUrl) {
      savedMessage.mediaUrl = await this._s3Uploader.retrieveFile(
        savedMessage.mediaUrl
      );
    }

    // Emit the new message through socket if needed
    // this._socketService.emitNewMessage(savedMessage);

    return savedMessage;
  }

  async getMessages(conversationId: string): Promise<IMessage[]> {
    const messages = await this._chatRepository.getMessagesByConversationId(
      conversationId
    );

    for (const message of messages) {
      if (message.mediaUrl && message.mediaType !== "none") {
        message.mediaUrl = await this._s3Uploader.retrieveFile(
          message.mediaUrl
        );
      }
    }

    return messages;
  }

  async getUsers(): Promise<IResident[]> {
    return await this._residentRepository.getResidents();
  }
}
