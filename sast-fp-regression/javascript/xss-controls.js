// Safe negative controls (JavaScript). Path validation copied from
// tigergate-test-path-traversal/safe (SAFE-004, SAFE-005, SAFE-006, SAFE-013); the
// response body is a server-controlled file, so it must not be reported as XSS.
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// SAFE-004 behavior: request only selects a key from a fixed allowlist.
const files = {
  report: "/app/files/report.pdf",
  invoice: "/app/files/invoice.pdf"
};

router.get("/safe/allowlist", (req, res) => {
  const type = String(req.query.type);
  const filename = Object.prototype.hasOwnProperty.call(files, type) ? files[type] : undefined;
  if (!filename) {
    throw new Error("Invalid file");
  }
  res.send(fs.readFileSync(filename)); // SAFE-XSS-JS-004
});

// SAFE-005 behavior: digits-only id.
router.get("/safe/orders/:id", (req, res) => {
  const id = req.params.id;
  if (!/^[0-9]{1,10}$/.test(id)) {
    throw new Error("Invalid ID");
  }
  res.send(fs.readFileSync(path.join("/app/orders", `${id}.json`))); // SAFE-XSS-JS-005
});

// SAFE-006 behavior: resolve + relative containment.
const BASE = path.resolve("/app/uploads");

router.get("/safe/contained", (req, res) => {
  const target = path.resolve(BASE, String(req.query.file));
  const rel = path.relative(BASE, target);
  if (rel === "" || rel === ".." || rel.startsWith(".." + path.sep) || path.isAbsolute(rel)) {
    throw new Error("Path escapes base directory");
  }
  res.send(fs.readFileSync(target)); // SAFE-XSS-JS-006
});

// SAFE-013 behavior: strict filename pattern.
router.get("/safe/notes", (req, res) => {
  const name = String(req.query.name);
  if (!/^[a-z0-9_-]{1,64}\.txt$/.test(name)) {
    throw new Error("Invalid filename");
  }
  res.send(fs.readFileSync(path.join("/app/notes", name))); // SAFE-XSS-JS-013
});

// HTML-escaped reflection.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

router.get("/safe/escaped", (req, res) => {
  res.send("<p>" + escapeHtml(req.query.q) + "</p>"); // SAFE-XSS-JS-ESC
});

router.get("/safe/constant", (req, res) => {
  res.send("<p>Service is running</p>"); // SAFE-XSS-JS-CONST
});

module.exports = router;
