// src/middleware/authorize.ts
import { Request, Response, NextFunction } from "express";

export default function authorize(role: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    if (req.user.role !== role && req.user.role !== "admin") {
      res.status(403).json({ error: "Insufficient permissions" });
      return;
    }

    next();
  };
}