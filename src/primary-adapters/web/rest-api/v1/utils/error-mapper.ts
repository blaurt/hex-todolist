import { HttpException, InternalServerErrorException } from "@nestjs/common";
import { AppBaseException } from "src/core/shared/exceptions/app-base.exception";
import { AppValidationException } from "src/core/shared/exceptions/validation.exception";

export class RestErrorMapper {
    mapException(exception: AppBaseException) {
        if(exception instanceof AppValidationException){
            throw new 
        }
        if (exception instanceof AppBaseException) {
            throw new InternalServerErrorException("Something went wrong");
        }
    }
}
