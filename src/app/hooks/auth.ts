import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

interface AuthProps {
  middleware?: string;
  redirectIfAuthenticated?: string;
}

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: AuthProps = {}) => {
  const router = useRouter();
  const params = useParams();

  const {
    data: user,
    error,
    mutate,
  } = useSWR<User>("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        router.push("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  interface RegisterProps {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    setErrors: (errors: any[]) => void;
  }

  const register = async ({ setErrors, ...props }: RegisterProps) => {
    await csrf();

    setErrors([]);

    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  interface LoginProps {
    email: string;
    password: string;
    remember?: boolean;
  }

  const login = async ({
    setErrors,
    setStatus,
    ...props
  }: LoginProps & { setErrors: Function; setStatus: Function }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const forgotPassword = async ({
    setErrors,
    setStatus,
    email,
  }: ForgotPasswordProps) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({
    setErrors,
    setStatus,
    ...props
  }: ResetPasswordProps) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/reset-password", { token: params.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.data.status))
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({
    setStatus,
  }: ResendEmailVerificationProps) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

const logout = useCallback(async () => {
  if (!error) {
    await axios.post("/logout").then(() => mutate());
  }

  window.location.pathname = "/login";
}, [error, mutate]);


  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    }
    if (
      window.location.pathname === "/verify-email" &&
      user?.email_verified_at
    ) {
      router.push(redirectIfAuthenticated ?? "/default-route");
    }
    if (middleware === "auth" && error) {
      logout();
    }
  }, [user, error, logout, middleware, redirectIfAuthenticated, router]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};

type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
};

type RegisterProps = {
  setErrors: (errors: any[]) => void;
};

type LoginProps = {
  setErrors: (errors: any[]) => void;
  setStatus: (status: string | null) => void;
};

type ForgotPasswordProps = {
  setErrors: (errors: any[]) => void;
  setStatus: (status: string | null) => void;
  email: string;
};

type ResetPasswordProps = {
  setErrors: (errors: any[]) => void;
  setStatus: (status: string | null) => void;
};

type ResendEmailVerificationProps = {
  setStatus: (status: string | null) => void;
};
