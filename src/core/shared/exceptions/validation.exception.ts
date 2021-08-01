import { DomainBaseException } from "./domain-base.exception";
import { ClientException } from "./client.exception";

interface Params {
    message?: string;
    errors?: string[];
}

const DEFAULT_PARAMS: Params = { message: "Validation error", errors: [] };

export class InvalidArgumentException extends ClientException {
    private readonly _errors: string[] = [];

    public constructor({ errors, message }: Params) {
        super(message ?? DEFAULT_PARAMS.message);
        this._errors = errors ?? DEFAULT_PARAMS.errors;
    }

    get errors() {
        return this._errors;
    }
}
