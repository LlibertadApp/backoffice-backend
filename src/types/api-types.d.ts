export interface LoginRequestBody {
  username: string;
  password: string;
}

export interface LoginResponseBody {
  status: bool;
  token: string;
}
