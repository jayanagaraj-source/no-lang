// SAFE-010 behavior (copied from tigergate-test-path-traversal/safe/typescript-safe.ts):
// typed allowlist; the request only picks a known key, the body is a server file.
import express, { Request, Response } from "express";
import * as fs from "fs";

const REPORTS = {
  monthly: "/app/reports/monthly.pdf",
  yearly: "/app/reports/yearly.pdf"
} as const;

type ReportKey = keyof typeof REPORTS;

function isReportKey(value: unknown): value is ReportKey {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(REPORTS, value);
}

export const router = express.Router();

router.get("/safe/ts-report", (req: Request<{}, unknown, unknown, { kind?: string }>, res: Response) => {
  if (!isReportKey(req.query.kind)) {
    res.status(400).end();
    return;
  }
  res.send(fs.readFileSync(REPORTS[req.query.kind])); // SAFE-XSS-JS-010
});
