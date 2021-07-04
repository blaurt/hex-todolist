import { AppBaseException } from 'src/core/shared/exceptions/app-base.exception';
import { BaseEntity } from 'src/core/shared/entities/BaseEntity.entity';
import { TodoItem } from './todo-item.entity';

export class TodoList extends BaseEntity {

  public constructor(
      private title = '',
      private description = '',
      private items: TodoItem[],
      private isDone = false,
      private isPrivate = true,
    ) {
        super();
    }

    public markAsDone(): void {
        if(this.items.some(item=>!item.isDone)){
            throw new AppBaseException('List contains unfinished items');
        }

        this.isDone = true;
    }
}
