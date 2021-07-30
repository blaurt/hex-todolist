import { injectable } from "inversify";
import { User } from "src/core/components/user/entities/user.entity";
import { UserRepository } from "src/core/components/user/ports/user.repository";
import { getRepository, Repository } from "typeorm";

import { UserEntity } from "../data/user.entity";

@injectable()
export class UserRepositoryPgAdapter implements UserRepository {
    private readonly baseRepo: Repository<UserEntity>;

    public constructor() {
        this.baseRepo = getRepository(UserEntity);
    }

    getBannedUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    update(entity: User, payload: Omit<Partial<User>, "entityId">): Promise<User> {
        throw new Error("Method not implemented.");
    }

    getList(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async delete(entityId: string): Promise<void> {
        await this.baseRepo.delete({ entity_id: entityId });

        return;
    }

    public async save(entity: User): Promise<User> {
        const mappedData = UserEntity.fromDomainObject(entity);
        const savedEntity = await this.baseRepo.save(mappedData);

        return UserEntity.toDomainObject(savedEntity);
    }

    public async getById(id: string): Promise<User | null> {
        const maybeEntity = await this.baseRepo.findOne({ where: { id } });

        return maybeEntity as unknown as User;
    }

    public async findByUsername(username: string): Promise<User | null> {
        const maybeEntity = await this.baseRepo.findOne({ where: { login: username } });

        return maybeEntity as unknown as User;
    }
}
