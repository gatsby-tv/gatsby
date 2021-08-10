export class ContextError extends Error {
  context: string;

  constructor(context: string) {
    super(`No ${context} context provided for component.`);
    this.context = context;
  }
}

export class FormError extends Error {
  target: string;

  constructor(id: string, message: string) {
    super(message);
    this.target = id;
  }
}

export class NotImplementedError extends Error {
  constructor(message: string) {
    super(message);
  }
}
