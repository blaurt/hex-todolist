import { Request } from "express";
import { inject, injectable } from "inversify";
import { UserJwtPayload } from "src/shared/interfaces/user-jwt-payload.interface";

import { JwtService, JwtServiceInjectionToken } from "../jwt/jwt-service.interface";
import { AuthService } from "./auth-service.interface";

@injectable()
export class HttpAuthService implements AuthService {
    public constructor(@inject(JwtServiceInjectionToken) private readonly jwtService: JwtService) {}

    public async authenticateRequestor(req: Request): Promise<UserJwtPayload | null> {
        const header = req.header("Authorization");
        if (!header) {
            return null;
        }

        const token = header.split(" ").pop();
        if (!token) {
            return null;
        }

        try {
            const userPayload = await this.jwtService.verify<UserJwtPayload>(token);

            return userPayload;
        } catch (error) {
            // todo add logger
            return null;
        }
    }
}
