export type SignUpHttpRequest = {
  email: string;
  password: string;
  nickname?: string;
};
export type LogInHttpRequest = {
  email: string;
  password: string;
};
export type SignUpUserDto = {
  email: string;
  encryptedPassword: string;
  nickname?: string;
};
export type UpdateUserDto = {
  userId: number;
  email: string;
  encryptedPassword: string;
  encryptedNewPassword?: string;
  nickname?: string;
};
