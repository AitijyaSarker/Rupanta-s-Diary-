const API_BASE =
  (import.meta.env?.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') || '';

type ApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: BodyInit | null;
  headers?: Record<string, string>;
  isFormData?: boolean;
};

export const apiFetch = async <T = any>(path: string, options: ApiOptions = {}): Promise<T> => {
  const { method = 'GET', body = null, headers = {}, isFormData = false } = options;
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;

  const requestInit: RequestInit = {
    method,
    credentials: 'include',
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body,
  };

  const response = await fetch(url, requestInit);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = (data && (data.message || data.error)) || 'Request failed';
    throw new Error(message);
  }

  return data as T;
};


