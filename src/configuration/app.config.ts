export const appConfig = {
    port: 4000,
    node_env: process.env.NODE_ENV || "local", // todo type list of available environments
    logger: {
        level: "warn",
    },
    "jwt-secret": "secret_key_here",
    diContainerModulesPath: [
        __dirname + "/../core/components/**/*container-module.binding{.ts,.js}",
        __dirname + "/../primary-adapters/**/*container-module.binding{.ts,.js}",
        __dirname + "/../secondary-adapters/**/*container-module.binding{.ts,.js}",
        __dirname + "/../use-cases/**/*container-module.binding{.ts,.js}",
    ],
};
