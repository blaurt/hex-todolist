import { ErrorDescriptor } from "src/shared/interfaces/error-descriptor.interface";

import { ClientException } from "./client.exception";
import { DomainBaseException } from "./domain-base.exception";

interface Params {
    message?: string;
    errors?: ErrorDescriptor[];
}

const DEFAULT_PARAMS: Params = {
    message: "Validation error",
    errors: [],
};

export class InvalidArgumentException extends ClientException {
    private readonly _errors: ErrorDescriptor[] = [];

    public constructor({ errors, message, }: Params) {
        super(message ?? DEFAULT_PARAMS.message);
        if (errors) {
            this._errors = errors;
        }
    }

    get errors() {
        return this._errors;
    }
}
