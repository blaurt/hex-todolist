import { ResponseFormat } from "./response-format.interface";

export interface ResponseFormatter {
    format<T = unknown>(payload: T): ResponseFormat<T>;
}

export const ResponseFormatterInjectionToken = Symbol("ResponseFormatter");
