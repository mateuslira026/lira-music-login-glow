
const CLIENT_ID = 'your_spotify_client_id'; // Você precisará configurar isso
const REDIRECT_URI = window.location.origin + '/callback';
const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'playlist-read-private',
  'playlist-read-collaborative'
].join(' ');

export class SpotifyService {
  private static accessToken: string | null = null;
  private static refreshToken: string | null = null;

  static getAuthUrl(): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
      show_dialog: 'true'
    });
    
    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  static async exchangeCodeForToken(code: string): Promise<void> {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    
    localStorage.setItem('spotify_access_token', data.access_token);
    localStorage.setItem('spotify_refresh_token', data.refresh_token);
  }

  static getStoredToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('spotify_access_token');
    }
    return this.accessToken;
  }

  static async searchTracks(query: string, limit: number = 20): Promise<any> {
    const token = this.getStoredToken();
    if (!token) throw new Error('No access token');

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to search tracks');
    }

    return response.json();
  }

  static async getUserPlaylists(): Promise<any> {
    const token = this.getStoredToken();
    if (!token) throw new Error('No access token');

    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get playlists');
    }

    return response.json();
  }

  static async getPlaylistTracks(playlistId: string): Promise<any> {
    const token = this.getStoredToken();
    if (!token) throw new Error('No access token');

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get playlist tracks');
    }

    return response.json();
  }

  static isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  static logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
  }
}
