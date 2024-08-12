import { app, httpServer, socketService } from "@/infrastructure/config/app";

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
  `[ SERVICE :: COMMUNICATION SERVICE ] is listening on http://localhost:${PORT}`;
  `[ SERVICE :: SOCKER SERVER ] is listening on http://localhost:${PORT}`;
});
