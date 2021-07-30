import { ContainerModule } from "inversify";

import { SignInUseCase } from "./sign-in/sign-in.use-case";
import { SignUpUseCase } from "./sign-up/sign-up.use-case";

export default new ContainerModule((bind) => {
    bind(SignUpUseCase).toSelf();
    bind(SignInUseCase).toSelf();
});
