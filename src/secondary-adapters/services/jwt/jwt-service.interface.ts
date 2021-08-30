export interface JwtService {
    /**
     *
     * @param payload Any data safe enough to be exposed
     * @param expiresIn expiration time in seconds
     */
    sign(payload: Record<string, unknown>, expiresIn?: number): Promise<string>;

    /**
     * Verifies token, and returns its payload
     */
    verify<T extends Record<string, unknown>>(token: string): Promise<T>;

    /**
     * Same as verify, but doesn't perform verification
     */
    decode<T extends Record<string, unknown>>(token: string): T;
}

export const JwtServiceInjectionToken = Symbol("JwtService");
