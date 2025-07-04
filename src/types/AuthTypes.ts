export interface FormValuesSignIn {
  email: string;
  password: string;
}

export interface AuthState {
  step: number;
  loading: boolean;
  errors: Record<string, string>;
  isAuthenticated: boolean;
  user: {
    email: string;
  } | null;
  resetEmailSent: boolean;
}

export interface AuthActions {
  setStep: (step: number) => void;
  setLoading: (loading: boolean) => void;
  setErrors: (errors: Record<string, string>) => void;
  reset: () => void;

  // Registration
  registerEmail: (email: string) => Promise<void>;
  validateEmail: (code: number) => Promise<void>;
  setCredentials: (password: string) => Promise<void>;

  // Login
  login: (credentials: FormValuesSignIn) => Promise<void>;
  logout: () => void;
}

export interface AuthActions {
  setStep: (step: number) => void;
  setLoading: (loading: boolean) => void;
  setErrors: (errors: Record<string, string>) => void;
  registerEmail: (email: string) => Promise<void>;
  validateEmail: (code: number) => Promise<void>;
  setCredentials: (password: string) => Promise<void>;
  reset: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

export interface FormValuesSignUp {
  email: string;
  code: number;
  password: string;
  confirmPassword: string;
}

export interface FormValuesSignIn {
  email: string;
  password: string;
}

export interface FormValuesForgotPassword {
  email: string;
}
