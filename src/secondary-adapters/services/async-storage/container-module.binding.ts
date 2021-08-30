import { ContainerModule } from "inversify";

import { AsyncStorageInjectionToken } from "./async-storage.interface";
import { NodeAsyncStorageService } from "./node-async-storage.service";

export default new ContainerModule((bind) => {
    bind(AsyncStorageInjectionToken).to(NodeAsyncStorageService)
        .inSingletonScope();
});
