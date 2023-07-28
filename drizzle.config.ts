import "dotenv/config";
import { Config } from "drizzle-kit";
const { NODE_ENV, TURSO_DB_URL, TURSO_DB_TOKEN } = process.env;
const isDev = NODE_ENV === "development";

// Local
const sqlite = {
  driver: "better-sqlite",
  dbCredentials: {
    url: "./server/db/db.sqlite",
  },
};

// Turso
const turso = {
  driver: "turso",
  dbCredentials: {
    url: TURSO_DB_URL,
    authToken: TURSO_DB_TOKEN,
  },
};

const dbCreds = isDev ? sqlite : turso;

export default {
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
  ...dbCreds,
} satisfies Config;
