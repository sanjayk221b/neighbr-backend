import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

export class SocketService {
  private _io!: SocketIOServer;

  constructor() {}

  initialize(httpServer: HttpServer): void {
    this._io = new SocketIOServer(httpServer, {
      cors: {
        origin: ["http://localhost:5173", "*"],
        methods: ["GET", "POST"],
      },
    });
    this.initializeSocketEvents();
    console.log("Socket.IO server initialized");
  }

  private initializeSocketEvents(): void {
    this._io.on("connection", (socket: Socket) => {
      console.log("New client connected");

      socket.on("joinConversation", (conversationId: string) => {
        socket.join(conversationId);
        console.log(`Client joined conversation: ${conversationId}`);
      });

      socket.on("leaveConversation", (conversationId: string) => {
        socket.leave(conversationId);
        console.log(`Client left conversation: ${conversationId}`);
      });

      socket.on("newMessage", (message: any) => {
        console.log("New message received:", message);
        this._io.in(message.conversationId).emit("newMessage", message);
      });

      socket.on(
        "videoCallInvitation",
        (data: {
          conversationId: string;
          callerId: string;
          roomID: string;
        }) => {
          socket.to(data.conversationId).emit("videoCallInvitation", data);
        }
      );

      socket.on("videoCallRejected", (data: { callerId: string }) => {
        socket.to(data.callerId).emit("videoCallRejected");
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });

      socket.on("error", (error) => {
        console.error("Socket error:", error);
      });
    });
  }

  public close(): void {
    if (this._io) {
      this._io.close(() => {
        console.log("Socket.IO server closed");
      });
    }
  }
}
