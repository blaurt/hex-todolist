import { injectable } from "inversify";
import { ValidationError } from "joi";
import { InvalidArgumentException } from "src/core/shared/exceptions/validation.exception";

const DEFAULT_USE_CASE_CONFIG = {
    shouldValidate: true,
    shouldTrimSensitiveData: true,
    customDataTrimmer: (x: unknown) => x,
} as const;

export type UseCaseProps = Partial<typeof DEFAULT_USE_CASE_CONFIG>;

@injectable()
export abstract class BaseUseCase<TInput = unknown, TResult = void> {
    private readonly shouldValidate: boolean;
    private readonly shouldTrimResult: boolean;

    public constructor(props: UseCaseProps = DEFAULT_USE_CASE_CONFIG) {
        this.shouldValidate = props.shouldValidate ?? DEFAULT_USE_CASE_CONFIG.shouldValidate;
        this.shouldTrimResult = props.shouldTrimSensitiveData ?? DEFAULT_USE_CASE_CONFIG.shouldTrimSensitiveData;
    }

    public async execute(payload: TInput): Promise<TResult> {
        if (this.shouldValidate) {
            await this.handleValidation(payload);
        }

        const data = await this.handleRequest(payload);
        if (this.shouldTrimResult) {
            return this.trimResultData(data);
        }

        return data;
    }

    protected async handleValidation(payload: TInput): Promise<void> {
        try {
            await this.validate(payload);
        } catch (error) {
            throw new InvalidArgumentException({ errors: this.extractErrorMessages(error) });
        }
    }

    protected extractErrorMessages(error: ValidationError): string[] {
        return error.details.map(({ message }) => message);
    }

    protected abstract trimResultData(data: unknown): TResult;
    protected abstract handleRequest(payload: unknown): any;
    protected abstract validate(data: TInput): Promise<void>;
}
