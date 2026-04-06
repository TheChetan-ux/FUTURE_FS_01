import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";

export default function ResetPasswordPage() {
  return (
    <AuthShell
      eyebrow="Set a new password"
      title="Choose a fresh password"
      description="Open this page from the reset link sent to your email, then set a new password for your account."
      footerLabel="Need to sign in instead?"
      footerHref="/login"
      footerAction="Login"
    >
      <AuthForm mode="reset-password" />
    </AuthShell>
  );
}
