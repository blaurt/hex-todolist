import { ErrorDescriptor } from "src/shared/interfaces/error-descriptor.interface";

export interface ResponseFormat<T = unknown> {
    data: T;
    error: ErrorDescriptor | null;
    path: string;
    timestamp: string;
    metadata: Record<string, unknown> | null;
}
