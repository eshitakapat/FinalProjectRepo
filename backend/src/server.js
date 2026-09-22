import "dotenv/config";
import serverless from "serverless-http";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

/**
 * Ensures MongoDB Atlas is connected before executing requests.
 * Memoized promise prevents duplicate connection attempts in serverless mode.
 */
let dbPromise = null;
const ensureDatabaseConnected = async () => {
  if (!dbPromise) {
    dbPromise = connectDB();
  }
  await dbPromise;
};

// Wrap Express app with serverless-http for Vercel/Lambda deployment
const serverlessHandler = serverless(app);

/**
 * Serverless Entry Point (Used by Vercel)
 */
export const handler = async (event, context) => {
  // Prevent Lambda execution freeze while awaiting empty event loop handles
  context.callbackWaitsForEmptyEventLoop = false;
  
  // Ensure DB connection is active for the serverless invocation
  await ensureDatabaseConnected();

  return await serverlessHandler(event, context);
};

/**
 * Traditional Express Server Boot Routine (Used for local `npm run dev`)
 */
if (process.env.NODE_ENV !== "production") {
  ensureDatabaseConnected()
    .then(() => {
      const server = app.listen(PORT, () => {
        console.log(`🚀 CareFlow Local Express Server running on http://localhost:${PORT}`);
      });

      // Graceful termination handling
      const shutdown = (signal) => {
        console.log(`\n⚠️  Received ${signal}. Closing HTTP listener...`);
        server.close(() => {
          console.log("🛑 Server closed cleanly.");
          process.exit(0);
        });
      };

      process.on("SIGINT", () => shutdown("SIGINT"));
      process.on("SIGTERM", () => shutdown("SIGTERM"));
    })
    .catch((err) => {
      console.error("💥 Failed to start local server:", err);
    });
}

// Default export for Vercel serverless platform compatibility
export default app;