export class TokenService {
  private accessToken: null | string = null;

  get(): string | null {
    return this.accessToken;
  }

  set(token: string) {
    this.accessToken = token;
  }

  clear() {
    this.accessToken = null;
  }
}

export const tokenService = new TokenService();
