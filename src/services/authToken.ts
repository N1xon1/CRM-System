let _accessToken: string | null = null;

export const tokenService = {
  get: () => _accessToken,
  set: (token: string) => {
    _accessToken = token;
  },
  clear: () => {
    _accessToken = null;
  },
};
