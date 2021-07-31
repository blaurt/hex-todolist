import { ContainerModule } from "inversify";

import { ErrorMapperInjectionToken } from "./error-mapper.interface";
import { RestErrorMapper } from "./rest.error-mapper";

export default new ContainerModule((bind) => {
    bind(ErrorMapperInjectionToken).to(RestErrorMapper);
});
