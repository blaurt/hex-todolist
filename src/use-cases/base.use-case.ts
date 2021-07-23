const DEFAULT_USE_CASE_CONFIG = {
    shouldValidate: true,
    shouldTrimSensitiveData: true,
    customDataTrimmer: (x: unknown) => x,
} as const;

export type UseCaseProps = Partial<typeof DEFAULT_USE_CASE_CONFIG>;

export abstract class BaseUseCase<TResult> {
    private readonly shouldValidate: boolean;
    private readonly shouldTrimSensitiveData: boolean;
    private readonly customDataTrimmer: (x: unknown) => unknown;

    public constructor(props: UseCaseProps = DEFAULT_USE_CASE_CONFIG) {
        this.shouldValidate = props.shouldValidate ?? DEFAULT_USE_CASE_CONFIG.shouldValidate;
        this.shouldTrimSensitiveData = props.shouldTrimSensitiveData ?? DEFAULT_USE_CASE_CONFIG.shouldTrimSensitiveData;
        this.customDataTrimmer = props.customDataTrimmer ?? DEFAULT_USE_CASE_CONFIG.customDataTrimmer;
    }

    protected abstract trimResultData(data: unknown): unknown;
    protected abstract validate(payload: unknown): Promise<void>;
    public abstract execute(payload: unknown): Promise<Partial<TResult>>;
}
