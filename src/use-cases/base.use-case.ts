const DEFAULT_USE_CASE_CONFIG = {
    shouldValidate: true
} as const

export abstract class BaseUseCase<TResult> {
    private readonly shouldValidate: boolean;

    public constructor(props: typeof DEFAULT_USE_CASE_CONFIG = DEFAULT_USE_CASE_CONFIG){
        this.shouldValidate = props.shouldValidate;
    }
    
    protected abstract validate(): Promise<void>;
    protected abstract execute(): Promise<TResult>;

}