export class TodoItem {
    public constructor(
        private readonly title = '',
        private readonly description = '',
        private readonly _isDone = false,
        private readonly isPrivate = true
    ){}

  get isDone() {
      return this._isDone;
  }
}