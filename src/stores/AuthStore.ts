import { create } from "zustand";
import {
  registerEmail,
  emailValidation,
  checkCredentials,
  logInUser,
  resetPassword,
} from "@/lib/actions/auth";
import type {
  AuthState,
  AuthActions,
  FormValuesSignIn,
} from "../types/AuthTypes";
import Cookies from "js-cookie";

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  step: 1,
  loading: false,
  errors: {},
  isAuthenticated: !!Cookies.get("auth"),
  user: null,
  resetEmailSent: false,

  setStep: (step) => set({ step }),
  setLoading: (loading) => set({ loading }),
  setErrors: (errors) => set({ errors }),

  reset: () => set({ step: 1, loading: false, errors: {} }),

  registerEmail: async (email: string) => {
    set({ loading: true });
    try {
      const res = await registerEmail(email);
      if (res.error) {
        set({ errors: { email: res.error } });
      } else {
        set({ step: 2 });
      }
    } catch (error) {
      set({ errors: { email: "Something went wrong" } });
    } finally {
      set({ loading: false });
    }
  },

  validateEmail: async (code: number) => {
    set({ loading: true });
    try {
      const res = await emailValidation(code);
      if (res.error) {
        set({ errors: { code: res.error } });
      } else {
        set({ step: 3 });
      }
    } catch (error) {
      set({ errors: { code: "Something went wrong" } });
    } finally {
      set({ loading: false });
    }
  },

  setCredentials: async (password: string) => {
    set({ loading: true });
    try {
      const res = await checkCredentials(password);
      if (res.error) {
        set({ errors: { password: res.error } });
      } else {
        set({ step: 1 });
      }
    } catch (error) {
      set({ errors: { password: "Something went wrong" } });
    } finally {
      set({ loading: false });
    }
  },

  login: async (credentials: FormValuesSignIn) => {
    set({ loading: true, errors: {} });
    try {
      const res = await logInUser(credentials.email, credentials.password);

      if (res.error) {
        set({ errors: { auth: res.error } });
        return;
      }

      set({
        isAuthenticated: true,
        user: { email: credentials.email },
      });
    } catch (error) {
      set({ errors: { auth: "Something went wrong. Please try again." } });
      console.error("Login error:", error);
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    Cookies.remove("auth");
    set({
      isAuthenticated: false,
      user: null,
    });
  },

  forgotPassword: async (email: string) => {
    set({ loading: true, errors: {}, resetEmailSent: false });
    try {
      const res = await resetPassword(email);

      if (res.error) {
        set({ errors: { reset: res.error } });
        return;
      }

      set({ resetEmailSent: true });
    } catch (error) {
      set({ errors: { reset: "Something went wrong. Please try again." } });
      console.error("Forgot password error:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
