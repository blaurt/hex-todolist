import { inject, injectable } from "inversify";
import { sign, SignOptions, verify } from "jsonwebtoken";
import { promisify } from "util";

import { ConfigService, ConfigServiceInjectionToken } from "../config/config.interface";
import { JwtService } from "./jwt-service.interface";

const verifyAsync = promisify<string, string, Record<string, unknown>>(verify);
const signAsync = promisify<Record<string, unknown>, string, SignOptions, string>(sign);

const DEFAULT_EXPIRATION = 60 * 60; // 1h

@injectable()
export class JsonWebTokenService implements JwtService {
    private readonly secret: string;

    public constructor(@inject(ConfigServiceInjectionToken) private readonly config: ConfigService) {
        this.secret = this.config.get("jwt-secret");
    }

    public async verify(token: string): Promise<Record<string, unknown>> {
        return verifyAsync(token, this.secret);
    }

    public async sign(payload: Record<string, unknown>, expiresInSeconds: number = DEFAULT_EXPIRATION): Promise<string> {
        return signAsync(payload, this.secret, { expiresIn: expiresInSeconds });
    }
}
