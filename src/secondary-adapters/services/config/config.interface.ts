export interface ConfigService {
    get<T extends string | number = string>(key: string): T;
}
