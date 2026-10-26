// Format-string and log-injection fixtures (JavaScript). Static-scan only.
const express = require("express");

const router = express.Router();
const TASKS = ["reindex", "cleanup", "digest"];

// ---- Candidate false positives: internal values only ----

function runTasks() {
  for (const taskName of TASKS) {
    console.log("Task " + taskName + " started at", Date.now()); // FP-FMT-JS-001
  }
}

function reportBatch(count, durationMs) {
  console.log("Processed " + count + " items in %d ms", durationMs); // FP-FMT-JS-002
}

function workerHeartbeat(workerId) {
  console.info("worker-" + workerId + " alive", { pid: process.pid }); // FP-FMT-JS-003
}

// ---- Positive controls: attacker-controlled data reaches the log ----

router.post("/login", (req, res) => {
  console.log("login failed for " + req.body.username); // TP-LOG-JS-001 (newline injection)
  res.sendStatus(401);
});

router.get("/track", (req, res) => {
  console.warn("client agent: " + req.query.agent); // TP-LOG-JS-002 (carriage return injection)
  res.sendStatus(204);
});

router.get("/audit", (req, res) => {
  console.log(`[INFO] user=${req.query.user} action=view`); // TP-LOG-JS-003 (forged entry)
  res.sendStatus(204);
});

router.post("/event", (req, res) => {
  console.log("{\"event\":\"" + req.body.event + "\",\"level\":\"info\"}"); // TP-LOG-JS-004 (structure)
  res.sendStatus(204);
});

module.exports = { router, runTasks, reportBatch, workerHeartbeat };
