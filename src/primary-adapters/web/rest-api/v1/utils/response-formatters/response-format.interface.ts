export interface ResponseFormat<T = unknown> {
    status: number;
    data: T;
    errors: string[];
    metadata?: Record<string, unknown>;
}
