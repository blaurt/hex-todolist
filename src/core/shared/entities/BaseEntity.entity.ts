import { v4 } from 'uuid';


export abstract class BaseEntity{
    protected readonly _entityId: string;

    public constructor(){
        this._entityId = v4();
    }

    get entityId(){
        return this._entityId;
    }
}