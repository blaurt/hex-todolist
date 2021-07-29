import { sign, SignOptions, verify } from "jsonwebtoken";
import { promisify } from "util";

import { ConfigService } from "../config/config.interface";
import { JwtService } from "./jwt-service.interface";

const verifyAsync = promisify<string, string, Record<string, unknown>>(verify);
const signAsync = promisify<Record<string, unknown>, string, SignOptions, string>(sign);

export class JsonWebTokenService implements JwtService {
    private readonly secret: string;

    public constructor(private readonly config: ConfigService) {
        this.secret = this.config.get("jwt-secret");
    }

    public async verify(token: string): Promise<Record<string, unknown>> {
        return verifyAsync(token, this.secret);
    }

    public async sign(payload: Record<string, unknown>, expiresInSeconds: number): Promise<string> {
        return signAsync(payload, this.secret, { expiresIn: expiresInSeconds, algorithm: "RS256" });
    }
}
