import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";
import { DIContainer } from "src/lib/di-container";
import { AsyncStorage, AsyncStorageInjectionToken } from "src/secondary-adapters/services/async-storage/async-storage.interface";

const container = DIContainer.getInstance();
const asyncStorage = container.get<AsyncStorage>(AsyncStorageInjectionToken);

export function TraceIdMiddlware(req: Request, res: Response, next: NextFunction): void {
    console.log("🚀 ~ file: trace-id.middleware.ts ~ line 10 ~ TraceIdMiddlware ~ TraceIdMiddlware");
    const traceId: string = (req.headers["x-request-id"] || nanoid()) as string;
    asyncStorage.bindToAsyncContext(next);
}
