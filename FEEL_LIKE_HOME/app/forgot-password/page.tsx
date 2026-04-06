import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Password help"
      title="Reset your password"
      description="Enter the email linked to your account and we will send you a reset link."
      footerLabel="Remembered it?"
      footerHref="/login"
      footerAction="Go back to login"
    >
      <AuthForm mode="forgot-password" />
    </AuthShell>
  );
}
