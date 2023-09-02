import "dotenv/config";
import { Config } from "drizzle-kit";
const { TURSO_DB_URL, TURSO_DB_TOKEN } = process.env;

const turso = {
  driver: "turso",
  dbCredentials: {
    url: TURSO_DB_URL,
    authToken: TURSO_DB_TOKEN,
  },
};

export default {
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
  ...turso,
} satisfies Config;
