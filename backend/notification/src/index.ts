import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import app from "./infrastructure/config/app";

import { createServer } from "@neighbr/common";

createServer({ app });
