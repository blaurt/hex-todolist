export interface ResponseFormat<T = unknown> {
    status: number;
    data: T;
    errors: Array<Record<string, unknown>>;
    metadata?: Record<string, unknown>;
}
