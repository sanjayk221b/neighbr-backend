import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import { logger, loadEnv } from "@neighbr/common";

import { httpServer } from "@/infrastructure/config/app";

const { PORT, SERVICE_NAME } = loadEnv(["PORT", "SERVICE_NAME"]);

httpServer.listen(PORT, () => {
  logger.info(
    `[ SERVICE :: ${SERVICE_NAME} ] is listening on http://localhost:${PORT}`
  );
});
