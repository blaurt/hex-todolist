export interface JwtService {
    sign(payload: Record<string, unknown>, expiresIn?: number): Promise<string>;
    verify(token: string): Promise<Record<string, unknown>>;
}

export const JwtServiceInjectionToken = Symbol("JwtService");
