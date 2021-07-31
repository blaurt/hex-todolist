import { AppBaseException } from "./app-base.exception";

interface Params {
    message?: string;
    errors?: string[];
}

const DEFAULT_PARAMS: Params = { message: "Validation error", errors: [] };

export class AppValidationException extends AppBaseException {
    private readonly _errors: string[] = [];

    public constructor({ errors, message }: Params) {
        super(message ?? DEFAULT_PARAMS.message);
        this._errors = errors ?? DEFAULT_PARAMS.errors;
    }

    get errors() {
        return this._errors;
    }
}
