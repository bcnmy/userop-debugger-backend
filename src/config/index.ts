import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../../.env") });

export const SERVER_PORT = Number(process.env.PORT) || 8000;

export const BASE_URL = process.env.BASE_URL
