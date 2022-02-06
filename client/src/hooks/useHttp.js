import { useState } from 'react';

export const useHttp = () => {
  const [isLoadng, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  const request = async (url, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true);

    if (body) {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setIsLoading(false);

      return data;
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
      throw e;
    }
  };

  return { isLoadng, request, error, clearError };
};
