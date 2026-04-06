"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

type AuthMode = "login" | "signup" | "forgot-password" | "reset-password";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName
            },
            emailRedirectTo: `${siteUrl}/login`
          }
        });

        if (signUpError) {
          throw signUpError;
        }

        setMessage("Signup successful. Check your email to confirm your account.");
      }

      if (mode === "login") {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (loginError) {
          throw loginError;
        }

        setMessage("Login successful. Redirecting...");
        router.push("/");
        router.refresh();
      }

      if (mode === "forgot-password") {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${siteUrl}/reset-password`
        });

        if (resetError) {
          throw resetError;
        }

        setMessage("Password reset link sent. Check your email.");
      }

      if (mode === "reset-password") {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match.");
        }

        const { error: updateError } = await supabase.auth.updateUser({
          password
        });

        if (updateError) {
          throw updateError;
        }

        setMessage("Password updated. You can login now.");
        router.push("/login");
      }
    } catch (submitError) {
      const nextError =
        submitError instanceof Error ? submitError.message : "Something went wrong.";
      setError(nextError);
    } finally {
      setLoading(false);
    }
  }

  const buttonLabel = {
    login: "Login",
    signup: "Create account",
    "forgot-password": "Send reset link",
    "reset-password": "Update password"
  }[mode];

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {mode === "signup" ? (
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">Full name</span>
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none transition focus:border-forest/40"
            placeholder="Your full name"
            required
          />
        </label>
      ) : null}

      {mode !== "reset-password" ? (
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">Email address</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none transition focus:border-forest/40"
            placeholder="you@example.com"
            required
          />
        </label>
      ) : null}

      {mode === "login" || mode === "signup" || mode === "reset-password" ? (
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none transition focus:border-forest/40"
            placeholder="Enter password"
            required
            minLength={6}
          />
        </label>
      ) : null}

      {mode === "reset-password" ? (
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">Confirm password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none transition focus:border-forest/40"
            placeholder="Confirm password"
            required
            minLength={6}
          />
        </label>
      ) : null}

      {mode === "login" ? (
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm font-semibold text-forest">
            Forgot password?
          </Link>
        </div>
      ) : null}

      {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
      {message ? (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-forest px-5 py-3 font-semibold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Please wait..." : buttonLabel}
      </button>
    </form>
  );
}
