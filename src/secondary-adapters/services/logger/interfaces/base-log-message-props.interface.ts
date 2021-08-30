import { LOG_LEVEL } from "./log-levels.enum";

export interface BaseLogMessageProps {
    timestamp: string;
    requestId: string; // nanoid
    level: LOG_LEVEL;
    message: string;
}
