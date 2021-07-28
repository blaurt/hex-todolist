const DEFAULT_USE_CASE_CONFIG = {
    shouldValidate: true,
    shouldTrimSensitiveData: true,
    customDataTrimmer: (x: unknown) => x,
} as const;

export type UseCaseProps = Partial<typeof DEFAULT_USE_CASE_CONFIG>;

export abstract class BaseUseCase<TInput = unknown, TResult = void> {
    private readonly shouldValidate: boolean;
    private readonly shouldTrimResult: boolean;
    // private readonly customDataTrimmer: (x: unknown) => unknown;

    public constructor(props: UseCaseProps = DEFAULT_USE_CASE_CONFIG) {
        this.shouldValidate = props.shouldValidate ?? DEFAULT_USE_CASE_CONFIG.shouldValidate;
        this.shouldTrimResult = props.shouldTrimSensitiveData ?? DEFAULT_USE_CASE_CONFIG.shouldTrimSensitiveData;
        // this.customDataTrimmer = props.customDataTrimmer ?? DEFAULT_USE_CASE_CONFIG.customDataTrimmer;
    }

    protected abstract trimResultData(data: unknown): TResult;
    protected abstract handleRequest(payload: unknown);

    protected abstract validate(data: TInput): Promise<void>;

    public async execute(payload: TInput): Promise<TResult> {
        if (this.shouldValidate)
            await this.validate(payload);

        const data = await this.handleRequest(payload);

        if (this.shouldTrimResult)
            return this.trimResultData(data);

        return data;
    }
}
