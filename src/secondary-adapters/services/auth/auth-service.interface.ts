import { User } from "src/core/components/user/entities/user.entity";

export interface AuthService {
    authenticateRequestor(input: unknown): Promise<Partial<User> | null>;
}

export const AuthServiceInjectionToken = Symbol("AuthService");
