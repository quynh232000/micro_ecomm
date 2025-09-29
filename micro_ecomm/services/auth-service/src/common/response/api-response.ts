// src/common/response/api-response.ts
export interface ErrorDetail {
  field?: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T | null;
  errors?: ErrorDetail[];
  meta?: Record<string, any>;
}
export class ApiResponseHelper {
  static success<T>(data: T, message = 'Success', meta: Record<string, any> = {}): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    };
  }

  static error(
    message = 'Error',
    errors: ErrorDetail[] = [],
    code = 400,
    meta: Record<string, any> = {},
  ): ApiResponse<null> {
    return {
      success: false,
      message,
      data: null,
      errors,
      meta: {
        code,
        timestamp: new Date().toISOString(),
        ...meta,
      },
    };
  }
}
