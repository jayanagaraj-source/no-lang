// SAST false-positive regression fixtures (JavaScript, response output).
// Static-scan fixtures only: the router is exported and never mounted or listening.
const express = require("express");
const fs = require("fs");
const path = require("path");
const { execSync, execFileSync } = require("child_process");
const shell = require("shelljs");

const router = express.Router();
const FILES = "/srv/app/files";

// ---- Candidate false positives: output of a file read or command, not an HTML reflection ----

router.get("/fp/read-sync", (req, res) => {
  const data = fs.readFileSync(path.join(FILES, req.query.file), "utf8");
  res.send(data); // FP-XSS-JS-001
});

router.get("/fp/read-promise", async (req, res) => {
  const data = await fs.promises.readFile(path.join(FILES, req.query.file), "utf8");
  res.send(data); // FP-XSS-JS-002
});

router.get("/fp/read-callback", (req, res) => {
  fs.readFile(path.join(FILES, req.query.file), "utf8", (err, data) => {
    res.send(data); // FP-XSS-JS-003
  });
});

router.get("/fp/exec-sync", (req, res) => {
  const output = execSync(req.query.cmd).toString();
  res.send(output); // REVIEW-XSS-JS-004
});

router.get("/fp/exec-file", (req, res) => {
  const output = execFileSync("git", ["log", "--oneline", "-n", "5", "--", req.query.dir]).toString();
  res.send(output); // FP-XSS-JS-005
});

router.get("/fp/shelljs", (req, res) => {
  const result = shell.exec("git status --short " + req.query.dir, { silent: true });
  res.send(result.stdout); // REVIEW-XSS-JS-006
});

// ---- Positive controls: genuine XSS ----

router.get("/tp/reflected", (req, res) => {
  res.send("<p>Hello " + req.query.name + "</p>"); // TP-XSS-JS-001
});

router.post("/tp/html-body", (req, res) => {
  res.type("html").send(`<div class="bio">${req.body.bio}</div>`); // TP-XSS-JS-002
});

router.get("/tp/uploaded-html/:id", (req, res) => {
  // Users upload arbitrary HTML to /srv/app/uploads; serving it as text/html is stored XSS.
  if (!/^[0-9]{1,10}$/.test(req.params.id)) {
    throw new Error("Invalid id");
  }
  const html = fs.readFileSync(path.join("/srv/app/uploads", `${req.params.id}.html`), "utf8");
  res.type("html").send(html); // TP-XSS-JS-003
});

router.get("/tp/command-echo", (req, res) => {
  const output = execFileSync("echo", [req.query.msg]).toString();
  res.type("html").send(output); // TP-XSS-JS-004
});

router.get("/tp/ssrf-echo", async (req, res) => {
  const upstream = await fetch(req.query.url);
  res.type("html").send(await upstream.text()); // TP-XSS-JS-005
});

module.exports = router;
