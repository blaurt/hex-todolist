import { ErrorDescriptor } from "src/shared/interfaces/error-descriptor.interface";

import { ResponseFormat } from "./response-format.interface";
import { ResponseFormatter } from "./response-formatter.interface";

export class JsonResponseFormatter<T> implements ResponseFormatter {
    public formatSuccess<T = unknown>(payload: T, path: string): ResponseFormat<T> {
        return {
            data: payload,
            error: null,
            timestamp: new Date().toISOString(),
            path,
            metadata: null,
        };
    }

    public formatError({ message, path, }: ErrorDescriptor & { path: string }): ResponseFormat<null> {
        return {
            data: null,
            error: { message,
                path, },
            timestamp: new Date().toISOString(),
            path,
            metadata: null,
        };
    }
}
