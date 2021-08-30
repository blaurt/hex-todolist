import { AsyncStore } from "./async-store.interface";

export interface AsyncStorage<TMapKeys extends AsyncStore = AsyncStore> {
    get(key: keyof TMapKeys): string | null;
    set(key: keyof TMapKeys, value: string): void;
    bindToAsyncContext(next: () => void): void;
}

export const AsyncStorageInjectionToken = Symbol("AsyncStorage");
