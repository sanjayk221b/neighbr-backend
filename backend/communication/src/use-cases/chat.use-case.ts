import { IMessage, IConversation, IParticipant, IResident } from "@/entities";
import {
  IChatRepository,
  IResidentRepository,
} from "@/infrastructure/repositories/interfaces";
import { SocketService } from "@/infrastructure/services/socket";

export class ChatUseCase {
  constructor(
    private _chatRepository: IChatRepository,
    private _socketService: SocketService,
    private _residentRepository: IResidentRepository
  ) {}

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

  async sendMessage(message: IMessage): Promise<IMessage> {
    const savedMessage = await this._chatRepository.createMessage(message);
    return savedMessage;
  }

  async getMessages(conversationId: string): Promise<IMessage[]> {
    return await this._chatRepository.getMessagesByConversationId(
      conversationId
    );
  }

  async getUsers(): Promise<IResident[]> {
    return await this._residentRepository.getResidents();
  }
}
