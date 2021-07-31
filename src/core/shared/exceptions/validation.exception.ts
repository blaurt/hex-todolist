import { AppBaseException } from "./app-base.exception";

interface Params {
    message?: string;
    errors?: string[];
}

const DEFAULT_PARAMS: Params = { message: "Validation error", errors: [] };

export class AppValidationException extends AppBaseException {
    private readonly errors: string[] = [];

    public constructor({ errors, message }: Params) {
        super(message ?? DEFAULT_PARAMS.message);
        this.errors = errors ?? DEFAULT_PARAMS.errors;
    }
}
