import {inject, injectable} from 'inversify';
import { User } from 'src/core/components/user/entities/user.entity';
import { UserRepository } from 'src/core/components/user/ports/user.repository';
import {BaseTypeORMRepository} from '../../shared/BaseTypeORMRepository';
import {UserEntity} from '../data/UserEntity';

@injectable()
export class UserRepositoryPgAdapter extends BaseTypeORMRepository<UserEntity> implements UserRepository {

    constructor(
    ) {
        super(UserEntity);
    }
    getBannedUsers(): Promise<User[]> {
        throw new Error('Method not implemented.');
    }
    update(entity: User, payload: Omit<Partial<User>, 'entityId'>): Promise<User> {
        throw new Error('Method not implemented.');
    }
    
    getList(): Promise<User[]> {
        throw new Error('Method not implemented.');
    }
    delete(entityId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async save(entity: User): Promise<User> {
        const savedEntity = await this.repository.save(entity);
        return savedEntity;
    }

    public async getById(id: string): Promise<User | null> {
        const maybeEntity = await this.repository.findOne({where: {id}});
        return maybeEntity as unknown as User;
    }

    public async findByUsername(username: string): Promise<User | null> {
        const maybeEntity = await this.repository.findOne({where: {username}});
        return maybeEntity as unknown as User;
    }

}
