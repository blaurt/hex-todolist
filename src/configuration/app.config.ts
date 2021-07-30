export const appConfig = {
    port: 3033,
    "jwt-secret": "secret_key_here",
    diContainerModulesPath: [
        __dirname + "/../core/component/**/*container-module.binding{.ts,.js}",
        // __dirname + "/../primary-adapters/**/*container-module.binding{.ts,.js}",
        __dirname + "/../secondary-adapters/**/*container-module.binding{.ts,.js}",
    ],
};
