import type { User, UserDetail } from 'src/types/user';
import { apiDelete, apiGet, apiPatch, apiPost, apiPut, getFormData } from 'src/utils/api-request';

type SignInRequest = {
  email: string;
  password: string;
};

export type InitialSignUpRequest = {
  email: string;
};

type SignInResponse = UserDetail & { token: string };

export type SignUpRequest = {
  fullName: string;
  password: string;
  phone: string;
  token: string;
};

type SignUpResponse = Promise<{
  accessToken: string;
}>;

export class UsersApi {
  static async signIn(request: SignInRequest): Promise<SignInResponse> {
    return await apiPost('/auth/signin', request);
  }

  static async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    return await apiPost('/users', request);
  }

  static async me(): Promise<UserDetail> {
    return await apiGet('/users/info');
  }

  static async initiateSignUp(request: InitialSignUpRequest): Promise<void> {
    return await apiPost('/auth/signup/initiate', request);
  }

  static async completeSignUp(request: SignUpRequest): Promise<UserDetail> {
    const response = await apiPost('/auth/signup/complete', request);
    return response;
  }

  static async updatePassword(payload: {
    old_password: string;
    new_password: string;
  }): Promise<User> {
    return await apiPost('/users/password', payload);
  }
}
