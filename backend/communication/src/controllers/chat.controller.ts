import { Request, Response, NextFunction } from "express";
import { ChatUseCase } from "@/use-cases";
import { IMessage, IParticipant } from "@/entities";

export class ChatController {
  constructor(private chatUseCase: ChatUseCase) {}

  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { content, conversationId, senderId, senderType } = req.body;
      console.log(req.body);
      console.log(req.file);
      const file = req.file;

      const messageData: Partial<IMessage> = {
        content,
        conversationId,
        senderId,
        senderType,
      };

      const newMessage = await this.chatUseCase.sendMessage(messageData, file);
      res.status(201).json(newMessage);
    } catch (error) {
      next(error);
    }
  }

  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const conversationId: string = req.params.conversationId;
      const messages = await this.chatUseCase.getMessages(conversationId);
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }

  async createConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        participants,
        isGroup,
        groupName,
      }: {
        participants: IParticipant[];
        isGroup: boolean;
        groupName?: string;
      } = req.body;
      const newConversation = await this.chatUseCase.createConversation(
        participants,
        isGroup,
        groupName
      );
      res.status(201).json(newConversation);
    } catch (error) {
      next(error);
    }
  }

  async getConversations(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.params.userId;
      const conversations = await this.chatUseCase.getConversations(userId);
      res.status(200).json(conversations);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.chatUseCase.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}
