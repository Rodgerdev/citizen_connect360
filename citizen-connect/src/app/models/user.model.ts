export interface User {
  id: string;
  username: string;
  email: string;
  role: 'citizen' | 'government' | 'admin';
  password: string
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterReq {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  user: User;
}

export interface Approval {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}