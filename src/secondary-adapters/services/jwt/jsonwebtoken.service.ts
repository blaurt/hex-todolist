import { inject, injectable } from "inversify";
import { decode, sign, SignOptions, verify } from "jsonwebtoken";
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

    public async sign(payload: Record<string, unknown>, expiresInSeconds: number = DEFAULT_EXPIRATION): Promise<string> {
        return signAsync(payload, this.secret, { expiresIn: expiresInSeconds, });
    }

    public async verify<T extends Record<string, unknown>>(token: string): Promise<T> {
        return verifyAsync(token, this.secret) as unknown as T;
    }

    public decode<T extends Record<string, unknown>>(token: string): T {
        return decode(token) as T;
    }
}
