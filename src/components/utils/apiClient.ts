const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:5000';

class ApiClient {
  private baseURL: string;
  private wsConnection: WebSocket | null = null;
  private wsEventListeners: Map<string, Function[]> = new Map();
  private authToken: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.authToken = localStorage.getItem('authToken');
    this.initializeWebSocket();
  }

  // Initialize WebSocket connection for real-time features
  private initializeWebSocket() {
    try {
      this.wsConnection = new WebSocket(WS_URL);
      
      this.wsConnection.onopen = () => {
        console.log('WebSocket connected');
      };

      this.wsConnection.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleWebSocketMessage(data);
        } catch (error) {
          console.error('WebSocket message parse error:', error);
        }
      };

      this.wsConnection.onclose = () => {
        console.log('WebSocket disconnected, attempting to reconnect...');
        setTimeout(() => this.initializeWebSocket(), 3000);
      };

      this.wsConnection.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('WebSocket initialization error:', error);
    }
  }

  private handleWebSocketMessage(data: any) {
    const listeners = this.wsEventListeners.get(data.type) || [];
    listeners.forEach(listener => listener(data));
  }

  // Subscribe to WebSocket events
  on(eventType: string, callback: Function) {
    if (!this.wsEventListeners.has(eventType)) {
      this.wsEventListeners.set(eventType, []);
    }
    this.wsEventListeners.get(eventType)!.push(callback);
  }

  // Send WebSocket message
  send(message: any) {
    if (this.wsConnection && this.wsConnection.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify(message));
    }
  }

  // Set authentication token
  setAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  // Clear authentication token
  clearAuthToken() {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }

  // Generic request method
  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      defaultHeaders.Authorization = `Bearer ${this.authToken}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // HTTP methods
  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // File upload method
  async uploadFile(endpoint: string, file: File, additionalData?: Record<string, any>) {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    const headers: Record<string, string> = {};
    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return await response.json();
  }

  // Portfolio API methods
  async submitContact(contactData: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) {
    return this.post('/contact', contactData);
  }

  async downloadCV(format: 'pdf' | 'doc' | 'json') {
    const response = await fetch(`${this.baseURL}/cv/download/${format}`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error('Download failed');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Eric_Wambua_CV.${format}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  async getPortfolioAnalytics() {
    return this.get('/analytics/portfolio');
  }

  // Student Management API methods
  async getStudents(params?: {
    page?: number;
    limit?: number;
    search?: string;
    program?: string;
    year?: number;
  }) {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    return this.get(`/students${queryString ? `?${queryString}` : ''}`);
  }

  async getStudent(id: string) {
    return this.get(`/students/${id}`);
  }

  async createStudent(studentData: any) {
    return this.post('/students', studentData);
  }

  async updateStudent(id: string, studentData: any) {
    return this.put(`/students/${id}`, studentData);
  }

  async deleteStudent(id: string) {
    return this.delete(`/students/${id}`);
  }

  // Book Recommender API methods
  async getBooks(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    genre?: string;
    author?: string;
    minRating?: number;
    sortBy?: string;
  }) {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    return this.get(`/books${queryString ? `?${queryString}` : ''}`);
  }

  async getBook(id: string) {
    return this.get(`/books/${id}`);
  }

  async getBookRecommendations(userId: string, limit = 10) {
    return this.get(`/books/recommendations/${userId}?limit=${limit}`);
  }

  async addBookReview(bookId: string, rating: number, comment?: string) {
    return this.post(`/books/${bookId}/reviews`, { rating, comment });
  }

  // Campus Events API methods
  async getEvents(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    date?: string;
    location?: string;
  }) {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    return this.get(`/events${queryString ? `?${queryString}` : ''}`);
  }

  async getEvent(id: string) {
    return this.get(`/events/${id}`);
  }

  async createEvent(eventData: any) {
    return this.post('/events', eventData);
  }

  async joinEvent(eventId: string) {
    return this.post(`/events/${eventId}/join`);
  }

  async purchaseTicket(eventId: string, ticketType: string, quantity: number) {
    return this.post(`/events/${eventId}/tickets`, { ticketType, quantity });
  }

  // Network Scanner API methods
  async startNetworkScan(scanConfig: {
    target: string;
    type: string;
    options?: any;
  }) {
    return this.post('/network/scan', scanConfig);
  }

  async getScanResults(scanId: string) {
    return this.get(`/network/scans/${scanId}`);
  }

  async getNetworkDevices() {
    return this.get('/network/devices');
  }

  async getVulnerabilities() {
    return this.get('/network/vulnerabilities');
  }

  // Weather Analytics API methods
  async getWeatherData(location: string) {
    return this.get(`/weather/current?location=${encodeURIComponent(location)}`);
  }

  async getWeatherForecast(location: string, days = 7) {
    return this.get(`/weather/forecast?location=${encodeURIComponent(location)}&days=${days}`);
  }

  async getWeatherHistory(location: string, startDate: string, endDate: string) {
    return this.get(`/weather/history?location=${encodeURIComponent(location)}&start=${startDate}&end=${endDate}`);
  }

  async getWeatherStations() {
    return this.get('/weather/stations');
  }

  // Real-time subscriptions
  subscribeToNetworkScans(callback: (data: any) => void) {
    this.on('live_scan_update', callback);
    this.send({ type: 'join_room', room: 'network_scan' });
  }

  subscribeToWeatherUpdates(callback: (data: any) => void) {
    this.on('weather_update', callback);
    this.send({ type: 'join_room', room: 'weather' });
  }

  subscribeToEventNotifications(callback: (data: any) => void) {
    this.on('event_notification', callback);
    this.send({ type: 'join_room', room: 'events' });
  }

  // Utility methods
  async ping() {
    return this.get('/health');
  }

  // Track user interactions for analytics
  trackInteraction(action: string, data?: any) {
    // Send analytics data to backend
    this.post('/analytics/track', {
      action,
      data,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    }).catch(console.error); // Don't throw errors for analytics
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient();

// Export the class for testing or multiple instances
export default ApiClient;