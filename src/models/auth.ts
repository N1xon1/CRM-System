import { Roles } from "./admin";

export interface UserRegistration {
  login: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface RefreshToken {
  refreshToken: string;
}

export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
}

export interface ProfileRequest {
  userName: string;
  email: string;
  phoneNumber: string;
}

export interface PasswordRequest {
  password: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

// export type Role = ADMIN | USER | MODERATOR;

export enum ValidationConstraints {
  LoginMinLength = 2,
  PasswordMinLength = 6,
  UserNameMinLength = 1,
  MaxLenght = 60,
}
