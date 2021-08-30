import { ParsedQs } from "qs";
import { SUPPORTED_HTTP_METHODS } from "src/shared/types/supported-http-methods.enum";

import { BaseLogMessageProps } from "./base-log-message-props.interface";

export interface RequestInfo extends BaseLogMessageProps {
    message: "Request data";
    method: SUPPORTED_HTTP_METHODS | string;
    path: string;
    query: ParsedQs;
    body: Record<string, unknown>;
    headers: Record<string, string | string[] | undefined>;
}
