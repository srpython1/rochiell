import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      localStorage.removeItem('token');
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

export const stockApi = {
  search: async (symbol: string) => {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${
        import.meta.env.VITE_ALPHA_VANTAGE_API_KEY
      }`
    );
    return response.data;
  },

  getQuote: async (symbol: string) => {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${
        import.meta.env.VITE_ALPHA_VANTAGE_API_KEY
      }`
    );
    return response.data;
  },
};

export const paymentApi = {
  createOrder: async (amount: number) => {
    const response = await api.post('/api/payments/create-order', { amount });
    return response.data;
  },

  capturePayment: async (orderId: string) => {
    const response = await api.post('/api/payments/capture', { orderId });
    return response.data;
  },
};

export default api;