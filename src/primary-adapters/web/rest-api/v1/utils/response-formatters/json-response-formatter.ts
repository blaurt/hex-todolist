import { ResponseFormat } from "./response-format.interface";
import { ResponseFormatter } from "./response-formatter.interface";

export class JsonResponseFormatter<T> implements ResponseFormatter {
    public formatSuccess<T = unknown>(payload: T, status = 200): ResponseFormat<T> {
        return {
            data: payload,
            errors: [],
            status,
            metadata: null,
        };
    }

    public formatError(errorsData: string[], status = 500): ResponseFormat<null> {
        return {
            data: null,
            errors: errorsData,
            status,
            metadata: null,
        };
    }
}
