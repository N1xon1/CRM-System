// let _accessToken: string | null = null;

// export const tokenService = {
//   get: () => _accessToken,
//   set: (token: string) => {
//     _accessToken = token;
//   },
//   clear: () => {
//     _accessToken = null;
//   },
// };

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