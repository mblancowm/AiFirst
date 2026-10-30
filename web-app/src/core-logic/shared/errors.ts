export type ApiErrorStatus = 400 | 401 | 403 | 404 | 409 | 502 | 503;

export class AppError extends Error {
  constructor(
    message: string,
    readonly status: ApiErrorStatus,
  ) {
    super(message);
    this.name = "AppError";
  }
}
