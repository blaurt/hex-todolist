import { injectable } from "inversify";

import { appConfig } from "../../../configuration/app.config";
import { AppBaseException } from "../../../core/shared/exceptions/app-base.exception";
import { ConfigKeys, ConfigService } from "./config.interface";

type ConfigMap = Map<ConfigKeys, typeof appConfig[ConfigKeys]>;

@injectable()
export class AppConfig implements ConfigService {
    private readonly values: ConfigMap;

    public constructor() {
        this.values = new Map(Object.entries(appConfig)) as ConfigMap;
    }

    // todo
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    public get(key: ConfigKeys) {
        const value = this.values.get(key);
        if (!value) {
            throw new AppBaseException(`ConfigService has no value for key: "${key}"`);
        }

        return value;
    }
}
