import { ErrorDescriptor } from "src/shared/interfaces/error-descriptor.interface";

import { ResponseFormat } from "./response-format.interface";

export interface ResponseFormatter {
    formatSuccess<T = unknown>(payload: T, path: string): ResponseFormat<T>;
    formatError({ message, details, path }: ErrorDescriptor & { path: string }): ResponseFormat;
}

export const ResponseFormatterInjectionToken = Symbol("ResponseFormatter");
