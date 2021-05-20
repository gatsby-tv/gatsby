export class FormError extends Error {
  target: string;

  constructor(id: string, message: string) {
    super(message);
    this.target = id;
  }
}
