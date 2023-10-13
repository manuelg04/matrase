export interface IOtpRepository {
  otpGenerator: (user: string) => Promise<string | boolean>;

  sendOtpGenerator: (email: string, otp: string) => Promise<object | boolean>;

  validationOtp: (
    user: string,
    otp: string,
    password: string
  ) => Promise<object | boolean>;

  updatePassword: (user: string, password: string) => Promise<object | boolean>;
}
