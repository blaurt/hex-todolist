import { BadRequestException, HttpException, InternalServerErrorException } from "@nestjs/common";
import { injectable } from "inversify";
import { DomainBaseException } from "src/core/shared/exceptions/app-base.exception";
import { AppValidationException } from "src/core/shared/exceptions/validation.exception";

import { ErrorMapper } from "./error-mapper.interface";

@injectable()
export class RestErrorMapper implements ErrorMapper {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mapException<HttpException>(exception: DomainBaseException) {
        if (exception instanceof AppValidationException) {
            return new BadRequestException({
                description: "Validation failed",
                details: exception.errors,
            });
        }

        if (exception instanceof DomainBaseException) {
            return new InternalServerErrorException("Something went wrong");
        }
    }
}
