import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DIContainerFactory } from "src/lib/di-container.factory";

import { ResponseFormatter, ResponseFormatterInjectionToken } from "./response-formatter.interface";

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    private readonly responseFormatter: ResponseFormatter;

    public constructor() {
        const container = DIContainerFactory.getInstance();
        this.responseFormatter = container.get<ResponseFormatter>(ResponseFormatterInjectionToken);
    }

    public intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(map((data) => this.responseFormatter.formatSuccess(data)));
    }
}
