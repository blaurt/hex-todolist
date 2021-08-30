import { RequestInfo } from "./request-info.interface";


export interface LogRequestParams {
    method: RequestInfo["method"];
    path: RequestInfo["path"];
    headers: RequestInfo["headers"];
    query: RequestInfo["query"];
    body: RequestInfo["body"];
}
