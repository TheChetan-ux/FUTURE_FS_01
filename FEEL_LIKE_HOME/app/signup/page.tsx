import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="Create account"
      title="Start with a renter or owner profile"
      description="Create a basic account first. You can continue into owner onboarding, verification, and listing setup afterward."
      footerLabel="Already have an account?"
      footerHref="/login"
      footerAction="Login"
    >
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
