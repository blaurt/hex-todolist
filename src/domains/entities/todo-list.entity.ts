import { AppException } from 'src/AppException.exception';
import { TodoItem } from './todo-item.entity';

export class TodoList {
  public constructor(
      private items: TodoItem[],
      private isDone = false,
      private isPrivate = true
    ) {}

    public markAsDone(): void {
        if(this.items.some(item=>!item.isDone)){
            throw new AppException('List contains unfinished items');
        }

        this.isDone = true;
    }
}
