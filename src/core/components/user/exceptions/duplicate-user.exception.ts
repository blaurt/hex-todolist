import { ClientException } from "src/core/shared/exceptions/client.exception";
import { DomainBaseException } from "src/core/shared/exceptions/domain-base.exception";

export class DuplicateUserException extends ClientException {}
