type LogFn = (msg: string, args?: Record<string, unknown>) => void;

export interface Logger {
  /**
   * Shows that the application’s situation is catastrophic, such that an important function is not working.
   * For example: the application is unable to connect to the data store, or message queue.
   */
  fatal: LogFn;

  /**
   * log every error condition at this level. That can be API calls that return errors or internal error conditions.
   */
  error: LogFn;

  /**
   * log at this level all events that could potentially become an error.
   */
  warn: LogFn;

  /**
   * Messages are like the normal behavior of applications. They state what happened.
   */
  info: LogFn;

  /**
   * log at this level about anything that happens in the program. This is mostly used during debugging,
   */
  debug: LogFn;
}

export const LoggerInjectionToken = Symbol('Logger');
