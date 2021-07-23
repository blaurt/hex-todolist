export interface ResponseFormat<T = unknown> {
    status: number,
    data: T,
    errors: Record<string, unknown>,
    metadata?: Record<string, unknown>,
}
