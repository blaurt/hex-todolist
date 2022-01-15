import { AsyncLocalStorage } from "node:async_hooks";

export const ALS_TOKEN = Symbol(`ALS_TOKEN`);

export const als = new AsyncLocalStorage();
