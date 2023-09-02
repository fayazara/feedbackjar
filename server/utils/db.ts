import { createClient as createLibSQLClient } from "@libsql/client/http";
import { drizzle as drizzleLibSQL, LibSQLDatabase } from "drizzle-orm/libsql";

export * as tables from "~/server/db/schema";

let _db: LibSQLDatabase | null = null;

export const useDb = () => {
  if (!_db) {
    if (process.env.TURSO_DB_URL && process.env.TURSO_DB_TOKEN) {
      // TURSO in production
      _db = drizzleLibSQL(
        createLibSQLClient({
          url: process.env.TURSO_DB_URL,
          authToken: process.env.TURSO_DB_TOKEN,
        })
      );
    } else {
      throw new Error("No database configured for production");
    }
  }
  return _db;
};
