import * as glob from "glob";
import { Container, ContainerModule } from "inversify";
import * as path from "path";

import { appConfig } from "../configuration/app.config";

// todo rename to IoCcontainer
export class DIContainer {
    private static instance: Container;

    private constructor() {
        DIContainer.instance = this.createDIContainer(appConfig.diContainerModulesPath);
    }

    public static getInstance(): Container {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer().createDIContainer(appConfig.diContainerModulesPath);
        }

        return DIContainer.instance;
    }

    private importContainerModuleInstancesFromDirectories(directories: string[], formats = [
        ".js",
        ".ts",
    ]): ContainerModule[] {
        const loadFileClasses = function (exported: any, allLoaded: ContainerModule[]): ContainerModule[] {
            if (exported instanceof ContainerModule) {
                allLoaded.push(exported);
            } else if (exported instanceof Array) {
                exported.forEach((i: any) => loadFileClasses(i, allLoaded));
            } else if (exported instanceof Object || typeof exported === "object") {
                Object.keys(exported).forEach((key) => loadFileClasses(exported[key], allLoaded));
            }

            return allLoaded;
        };

        const allFiles = directories.reduce((allDirs, dir) => allDirs.concat(glob.sync(path.normalize(dir))), [] as string[]);

        const dirs = allFiles
            .filter((file) => formats.indexOf(path.extname(file)) !== -1 && file.substring(file.length - 5, file.length) !== ".d.ts")
            .map((file) => require(file));

        return loadFileClasses(dirs, []);
    }

    private createDIContainer(containerModulesDirs: string[]) {
        const container = new Container();

        const containerModules = this.importContainerModuleInstancesFromDirectories(containerModulesDirs);
        container.load(...containerModules);

        return container;
    }
}
