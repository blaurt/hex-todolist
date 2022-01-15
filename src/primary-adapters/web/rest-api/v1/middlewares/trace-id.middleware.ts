import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";
import { als } from "src/secondary-adapters/services/logger/als";

export function TraceIdMiddleware(req: Request, res: Response, next: NextFunction): void {
    const asyncStorage = als;
    const traceId = req.headers["x-request-id"] || nanoid();
    const store = new Map().set("traceId", traceId);
    asyncStorage.run(store, () => {
        next();
    });
}
