export class GlobalResponse<T> {
  status: string;
  code: number;
  data: T;
  message: string;
  constructor(status: string, code: number, data: T, message: string) {
    this.status = status;
    this.code = code;
    this.data = data;
    this.message = message;
  }
}
