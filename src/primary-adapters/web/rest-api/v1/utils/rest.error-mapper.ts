import { BadRequestException, HttpException, InternalServerErrorException } from "@nestjs/common";
import { injectable } from "inversify";
import { AppBaseException } from "src/core/shared/exceptions/app-base.exception";
import { AppValidationException } from "src/core/shared/exceptions/validation.exception";

import { ErroMapper } from "./error-mapper.interface";

@injectable()
export class RestErrorMapper implements ErroMapper {
    mapException(exception: AppBaseException): HttpException {
        if (exception instanceof AppValidationException) {
            return new BadRequestException({
                reason: "Validation failed",
                errors: exception.errors,
            });
        }

        if (exception instanceof AppBaseException) {
            return new InternalServerErrorException("Something went wrong");
        }
    }
}
