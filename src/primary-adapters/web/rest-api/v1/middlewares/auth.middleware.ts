import { NextFunction, Request, Response } from "express";
import { DIContainer } from "src/lib/di-container";
import { HttpAuthService } from "src/secondary-adapters/services/auth/auth.service";
import { AuthServiceInjectionToken } from "src/secondary-adapters/services/auth/auth-service.interface";

const container = DIContainer.getInstance();
const authService = container.get<HttpAuthService>(AuthServiceInjectionToken);

export function AuthMiddleware(req: Request, res: Response, next: NextFunction): void {
    authService.authenticateRequestor(req).then(() => next());
}
