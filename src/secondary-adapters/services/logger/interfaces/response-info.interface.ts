import { BaseLogMessageProps } from "./base-log-message-props.interface";

export interface ResponseInfo extends BaseLogMessageProps {
    message: "Response data";
    responseCode: number;
    responseHeaders: Record<string, string>;
    responseBody: Record<string, unknown>;
}
