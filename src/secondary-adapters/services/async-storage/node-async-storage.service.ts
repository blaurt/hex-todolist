import { AsyncLocalStorage } from "async_hooks";
import { injectable } from "inversify";
import { nanoid } from "nanoid";
import { AppBaseException } from "src/core/shared/exceptions/app-base.exception";

import { AsyncStorage } from "./async-storage.interface";
import { AsyncStore } from "./async-store.interface";

/**
 * Temporally unused due to getStore issues
 */
@injectable()
export class NodeAsyncStorageService implements AsyncStorage {
    private static asyncStore: AsyncLocalStorage<Map<string, string>>;
    private static isBoundedToContext = false;

    public constructor() {
        NodeAsyncStorageService.asyncStore = new AsyncLocalStorage<Map<string, string>>();
    }

    static getInitialStore() {
        return new Map();
    }

    public bindToAsyncContext(next: () => any): void {
        const asyncStorage = NodeAsyncStorageService.asyncStore; // app.get(ASYNC_STORAGE);
        this.set("traceId", nanoid());

        asyncStorage.run(NodeAsyncStorageService.getInitialStore(), () => {
            next();
        });
    }

    public get(key: keyof AsyncStore): string | null {
        return this.getStore().get(key) ?? null;
    }

    public set(key: keyof AsyncStore, value: string): void {
        this.getStore().set(key, value);
    }

    private getStore(): Map<string, string> {
        const store = NodeAsyncStorageService.asyncStore;

        if (!store) {
            throw new AppBaseException("Async store is undefined. Ensure you use it inside of async context");
        }

        return store as any;
    }
}
