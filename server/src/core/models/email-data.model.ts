export class EmailData {
  email: string;
  subject?: string;
  template?: string;
  context?: Record<string, any>;

  constructor(source: Partial<EmailData>) {
    if (source) {
      Object.assign(this, source);
      this.context = this.context || {};
    }
  }
}
