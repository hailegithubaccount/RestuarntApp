import { AxiosError } from 'axios';

export type ParsedErrorDetail = {
  title?: string;
  description?: string;
};

export type ParsedError = {
  ok: false;
  status?: number;
  error: {
    type: string;
    message: string;
    details: ParsedErrorDetail[];
  };
  isNetworkError?: boolean;
  isTimeout?: boolean;
  isAuthError?: boolean;
  lock_duration?: string;
  blocked_until?: string;
  server_time?: string;
};

export function parseApiError(error: unknown): ParsedError {
  if (error && (error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError<any>;
    const status = axiosError.response?.status;
    const data = axiosError.response?.data;
    const code = axiosError.code;
    const normalized = (details: any): ParsedErrorDetail[] => {
      if (!details) {
        return [];
      }
      // If array → normalize each item
      if (Array.isArray(details)) {
        return details.map(d => ({
          title: d.title ?? 'Error',
          description: d.description ?? d.discription ?? JSON.stringify(d),
        }));
      }

      // If response has nested structure
      if (typeof details === 'object') {
        if (Array.isArray(details.error?.detail)) {
          return normalized(details.error.detail);
        }
        if (Array.isArray(details.error?.details)) {
          return normalized(details.error.details);
        }
        if (Array.isArray(details.detail)) {
          return normalized(details.detail);
        }
        if (Array.isArray(details.details)) {
          return normalized(details.details);
        }
        if (Array.isArray(details.errors)) {
          return normalized(details.errors);
        }

        return [
          {
            title: details.title ?? 'Error',
            description:
              details.description ??
              details.discription ??
              details.message ??
              JSON.stringify(details),
          },
        ];
      }

      // If plain string or unknown type
      return [{ title: 'Error', description: String(details) }];
    };

    // NETWORK ERROR
    if (code === 'ERR_NETWORK' || !axiosError.response) {
      return {
        ok: false,
        error: {
          type: 'Network Access',
          message: 'Network error. Please check your internet connection.',
          details: [],
        },
        isNetworkError: true,
      };
    }

    // TIMEOUT
    if (code === 'ECONNABORTED') {
      return {
        ok: false,
        error: {
          type: 'timeout',
          message: 'Request timed out. Please try again.',
          details: [],
        },
        isTimeout: true,
      };
    }

    // UNAUTHORIZED / SESSION
    if (status === 401 || status === 408) {
      return {
        ok: false,
        status,
        error: {
          type: 'Session Expired',
          message: 'Unauthorized or session expired. Please log in again.',
          details: [],
        },
        isAuthError: true,
      };
    }

    // VALIDATION / CLIENT ERRORS
    if (status === 402) {
      const details = normalized(
        data?.error?.detail || data?.error?.details || data?.data?.details,
      );
      const message =
        data?.error?.error_message ||
        data?.error?.message ||
        data?.data?.message ||
        data?.data?.error_message;
      return {
        ok: false,
        status,
        error: {
          type: data?.error,
          message,
          details,
        },
      };
    }
    if (status === 400 || status === 422) {
      const details = normalized(
        data?.error?.detail || data?.error?.details || data?.details,
      );
      const message =
        data?.error?.message ||
        data?.message ||
        details?.[0]?.description ||
        'Validation failed. Please check your input.';
      return {
        ok: false,
        status,
        error: {
          type: data?.error?.type || data?.type || 'validation_failed',
          message,
          details,
        },
        lock_duration:
          typeof data?.lock_duration === 'string'
            ? data.lock_duration
            : undefined,
        blocked_until:
          typeof data?.blocked_until === 'string'
            ? data.blocked_until
            : undefined,
        server_time:
          typeof data?.server_time === 'string' ? data.server_time : undefined,
      };
    }
    if (status === 404) {
      return {
        ok: false,
        status,
        error: {
          type: data?.error?.type || 'not_found',
          message: data?.error?.message || 'Resource not found.',
          details: [],
        },
      };
    }

    // SERVER ERROR
    if (status === 500 || status === 503 || status === 502) {
      return {
        ok: false,
        status,
        error: {
          type: 'Server error',
          message: 'Server error. Please try again later.',
          details: [],
        },
      };
    }

    // Fallback
    return {
      ok: false,
      status,
      error: {
        type: data?.error?.type || data?.type || 'unknown_error',
        message:
          data?.error?.message ||
          data?.message ||
          'Something went wrong. Try again.',
        details: normalized(data?.details),
      },
    };
  }

  // NON-AXIOS OR UNEXPECTED
  return {
    ok: false,
    error: {
      type: 'Unexpected error',
      message:
        (error as any)?.message ||
        'Unexpected error occurred. Please try again.',
      details: [],
    },
  };
}
