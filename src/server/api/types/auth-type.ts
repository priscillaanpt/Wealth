export type RegisterType = {
  email: string;
  password: string;
};

export type VerifyEmailType = {
  token: string;
};

export type ForgotPasswordType = {
  email: string;
};

export type ResetPasswordType = {
  token: string;
  newPassword: string;
};

export type ChangeEmailType = {
  password: string;
  newEmail: string;
  redirectUrl: string;
};

export type ChangePasswordType = {
  oldPassword: string;
  newPassword: string;
};

export type SendEmailTokenType = {
  userId: string;
  targetEmail: string;
  type: "PASSWORD_RESET" | "EMAIL_VERIFICATION";
};
