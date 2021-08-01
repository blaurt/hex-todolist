import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { injectable } from "inversify";
import { ClientException } from "src/core/shared/exceptions/client.exception";
import { DomainBaseException } from "src/core/shared/exceptions/domain-base.exception";
import { InvalidArgumentException } from "src/core/shared/exceptions/validation.exception";

import { ErrorMapper } from "./error-mapper.interface";

@injectable()
export class RestErrorMapper implements ErrorMapper {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mapException<HttpException>(exception: DomainBaseException) {
        if (exception instanceof InvalidArgumentException) {
            return new BadRequestException({
                message: exception.message,
                details: exception.errors,
            });
        }

        if (exception instanceof ClientException) {
            return new BadRequestException(exception.message);
        }

        if (exception instanceof DomainBaseException) {
            return new InternalServerErrorException("Something went wrong");
        }
    }
}
