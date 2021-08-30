import { injectable } from "inversify";
import { ValidationError } from "joi";
import { InvalidArgumentException } from "src/core/shared/exceptions/validation.exception";
import { SchemaNotDefinedException } from "src/secondary-adapters/exceptions/schema-not-defined.exception";
import { ErrorDescriptor } from "src/shared/interfaces/error-descriptor.interface";

const DEFAULT_USE_CASE_CONFIG: Required<UseCaseProps> = {
    shouldValidate: true,
    shouldTrimSensitiveData: true,
    customDataTrimmer: (x: unknown) => x,
} as const;

export interface UseCaseProps {
    shouldValidate?: boolean;
    shouldTrimSensitiveData?: boolean;
    customDataTrimmer?: (x: unknown) => unknown;
}

export interface ValidationSchema<T> {
    validateAsync: (value: any, options: { abortEarly: boolean }) => Promise<T>;
}

@injectable()
export abstract class BaseUseCase<TInput extends unknown, TResult = void> {
    protected readonly validationSchema: ValidationSchema<TInput> | null;

    private readonly shouldValidate: boolean;
    private readonly shouldTrimResult: boolean;

    public constructor(props: UseCaseProps = DEFAULT_USE_CASE_CONFIG) {
        this.shouldValidate = props.shouldValidate ?? DEFAULT_USE_CASE_CONFIG.shouldValidate;
        this.shouldTrimResult = props.shouldTrimSensitiveData ?? DEFAULT_USE_CASE_CONFIG.shouldTrimSensitiveData;
    }

    public async execute<TExpected = TResult>(payload: TInput): Promise<TExpected> {
        if (this.shouldValidate) {
            await this.handleValidation(payload);
        }

        const data = await this.handleRequest(payload);
        if (this.shouldTrimResult) {
            return this.trimResultData(data) as unknown as TExpected;
        }

        return data;
    }

    protected async handleValidation(payload: TInput): Promise<void> {
        try {
            await this.validate(payload);
        } catch (error) {
            throw new InvalidArgumentException({ errors: this.extractErrorMessages(error), });
        }
    }

    protected extractErrorMessages(error: ValidationError): ErrorDescriptor[] {
        return error.details.map(({ message, path, }) => ({
            path,
            message,
        }));
    }

    protected async validate(data: TInput): Promise<void> {
        if (this.validationSchema) {
            await this.validationSchema.validateAsync(data, { abortEarly: true, });
        } else {
            throw new SchemaNotDefinedException();
        }
    }

    // todo refactor type any
    protected trimResultData(data: any): TResult {
        return data;
    }

    protected abstract handleRequest(payload: unknown): any;
}
