export class ContextError extends Error {
  context: string;

  constructor(context: string) {
    super(`No ${context} context provided for component.`);
    this.context = context;
  }
}
