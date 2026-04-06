import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Account access"
      title="Login to Feel_Like_Home"
      description="Sign in to manage listings, continue conversations, and track stay or drive bookings."
      footerLabel="New here?"
      footerHref="/signup"
      footerAction="Create an account"
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
