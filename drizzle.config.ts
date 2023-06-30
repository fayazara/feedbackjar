import "dotenv/config";
import { Config } from "drizzle-kit";

export default {
  out: "./server/db/migrations",
  schema: "./server/db/schema.ts",
  breakpoints: true,
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DB_URL,
    authToken: process.env.TURSO_DB_TOKEN,
  },
} satisfies Config;
