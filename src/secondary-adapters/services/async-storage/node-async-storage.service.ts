import { AsyncLocalStorage } from "async_hooks";
import { injectable } from "inversify";
import { nanoid } from "nanoid";
import { AppBaseException } from "src/core/shared/exceptions/app-base.exception";

import { AsyncStorage } from "./async-storage.interface";
import { AsyncStore } from "./async-store.interface";

@injectable()
export class NodeAsyncStorageService implements AsyncStorage {
    private static asyncStore: AsyncLocalStorage<Map<string, string>>;
    private static isBoundedToContext = false;

    public constructor() {
        NodeAsyncStorageService.asyncStore = new AsyncLocalStorage<Map<string, string>>();
    }

    private static getInitialStore() {
        return new Map();
    }

    public bindToAsyncContext(next: () => void): void {
        if (NodeAsyncStorageService.isBoundedToContext) {
            throw new AppBaseException("Async storage can be binded to context only once");
        }

        NodeAsyncStorageService.asyncStore.run(NodeAsyncStorageService.getInitialStore(), () => {
            NodeAsyncStorageService.isBoundedToContext = true;

            next();
            this.set("traceId", nanoid());

        });
    }

    public get(key: keyof AsyncStore): string | null {
        return this.getStore().get(key) ?? null;
    }

    public set(key: keyof AsyncStore, value: string): void {
        this.getStore().set(key, value);
    }

    private getStore(): Map<string, string> {
        const store = NodeAsyncStorageService.asyncStore.getStore();
        console.log(
            "🚀 ~ file: node-async-storage.service.ts ~ line 45 ~ NodeAsyncStorageService ~ getStore ~ NodeAsyncStorageService.asyncStore",
            NodeAsyncStorageService.asyncStore,
        );
        if (!store) {
            throw new AppBaseException("Async store is undefined. Ensure you use it inside of async context");
        }

        return store;
    }
}
