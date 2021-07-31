import { AppBaseException } from "src/core/shared/exceptions/app-base.exception";

export interface ErroMapper {
    mapException(exception: AppBaseException): Error;
}
