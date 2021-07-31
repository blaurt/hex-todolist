import { ResponseFormat } from "./response-format.interface";

export class JsonResponseFormatter {
    public format<T = unknown>(payload: T): ResponseFormat<T> {
        return {
            data: payload,
            errors: [],
            status: 200,
            metadata: null,
        };
    }
}
