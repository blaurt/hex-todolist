import { BaseEntity } from "../entities/base-entity.entity";

// todo add type safe with smth like:  { [P in keyof T]: any } & IUnlistedParams
export interface EntityBuilder<T extends BaseEntity, TBuilderParams = any> {
    fromInput(params: TBuilderParams): Promise<T>;
}
