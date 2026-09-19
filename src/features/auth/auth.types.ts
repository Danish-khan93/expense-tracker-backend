export type ReqDataType = {
  fullName: string;
  email: string;
  password: string;
};


export type LoginUser = Pick<ReqDataType, "email" | "password">;