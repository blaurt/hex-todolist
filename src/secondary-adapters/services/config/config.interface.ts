import { appConfig } from "../../../configuration/app.config";

export type ConfigKeys = keyof typeof appConfig;

export interface ConfigService {
    get<T extends typeof appConfig[ConfigKeys]>(key: ConfigKeys): T;
}

export const ConfigServiceInjectionToken = Symbol("ConfigService");
