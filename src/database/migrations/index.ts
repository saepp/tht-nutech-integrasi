import fs from "fs";
import path from "path";
import { query } from "../index.js";

async function getAppliedMigrations(): Promise<string[]> {
  await query(`
        CREATE TABLE IF NOT EXISTS migrations (
          id BIGSERIAL PRIMARY KEY,
          name TEXT NOT NULL UNIQUE,
          applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

  const result = await query<{ name: string }>(
    "SELECT name FROM migrations ORDER BY applied_at ASC;"
  );
  return result.map((row) => row.name);
}

async function applyMigrations() {
  const migrationsDir = path.resolve("src/database/migrations");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"));
  const applied = await getAppliedMigrations();

  for (const file of files) {
    if (!applied.includes(file)) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
      await query(sql);
      await query("INSERT INTO migrations (name) VALUES ($1);", [file]);
      console.log(`Migration applied: ${file}`);
    }
  }

  console.log("All migrations are up to date.");
}

applyMigrations()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error applying migrations:", err);
    process.exit(1);
  });
