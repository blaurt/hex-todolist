export interface Mapper<DomainEntityType, DalType>{
    fromEntity(domainEntity: DomainEntityType): DalType;
    toEntity(obj: DalType): DomainEntityType;
}