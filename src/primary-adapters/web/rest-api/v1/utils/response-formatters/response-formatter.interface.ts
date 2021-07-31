import { ResponseFormat } from "./response-format.interface";

export interface ResponseFormatter {
    formatSuccess<T = unknown>(payload: T, status?: number): ResponseFormat<T>;
    formatError(errorData: string[], status?: number): ResponseFormat;
}

export const ResponseFormatterInjectionToken = Symbol("ResponseFormatter");
