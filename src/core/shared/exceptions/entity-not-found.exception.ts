import { BaseEntity } from "../entities/base-entity.entity";
import { ClientException } from "./client.exception";

function composeMessage(entityId: BaseEntity["entityId"]) {
    return `Entity with id: "${entityId}" was not found`;
}

export class EntityNotFoundException extends ClientException {
    public constructor({ message, entityId, }: { message?: string; entityId?: string }) {
        super(entityId
            ? composeMessage(entityId)
            : message ?? "");
    }
}
