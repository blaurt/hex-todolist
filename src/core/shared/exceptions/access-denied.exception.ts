import { ClientException } from "./client.exception";

export class AccessDeniedException extends ClientException {
    public constructor(message = "You don't have privilage to perform this action") {
        super(message);
    }
}
