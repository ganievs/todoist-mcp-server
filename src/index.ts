#!/usr/bin/env node
import runServer from "./server.js";

runServer().catch((error) => {
  console.error(`[ERROR] Fatal error in main():`, error);
  process.exit(1);
});
