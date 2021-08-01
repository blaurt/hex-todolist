import { injectable } from "inversify";
import { getRepository, Repository } from "typeorm";

import { User } from "../../../../core/components/user/entities/user.entity";
import { UserRepository } from "../../../../core/components/user/ports/user.repository";
import { UserEntity } from "./user.orm-entity";

@injectable()
export class UserRepositoryPgAdapter implements UserRepository {
    private readonly baseRepo: Repository<UserEntity>;

    public constructor() {
        this.baseRepo = getRepository(UserEntity);
    }

    public async getBannedUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    public async update(entityId: User["entityId"], payload: Omit<Partial<User>, "entityId">): Promise<User> {
        await this.baseRepo.update(entityId, payload);

        return this.getById(entityId);
    }

    public async getList(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async delete(entityId: string): Promise<void> {
        await this.baseRepo.delete({ entity_id: entityId });

        return;
    }

    public async save(entity: User): Promise<User> {
        const mappedData = UserEntity.fromDomainObject(entity);
        const savedEntity = await this.baseRepo.save(mappedData);

        return UserEntity.toDomainEntity(savedEntity);
    }

    public async getById(id: User["entityId"]): Promise<User | null> {
        const ormEntity = await this.baseRepo.findOne({ where: { id } });
        if (ormEntity) {
            return UserEntity.toDomainEntity(ormEntity);
        }

        return null;
    }

    public async findByUsername(username: string): Promise<User | null> {
        const ormEntity = await this.baseRepo.findOne({ where: { login: username } });
        if (ormEntity) {
            return UserEntity.toDomainEntity(ormEntity);
        }

        return null;
    }
}
