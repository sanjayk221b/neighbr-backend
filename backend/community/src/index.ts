import app from "@/infrastructure/config/app";
import { logger } from "@neighbr/common";
const PORT = process.env.PORT;

app.listen(PORT, () =>
  logger.info(`server is running on http://localhost:${PORT}`)
);