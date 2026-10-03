import { useState, type FormEvent } from "react";
import { Icon } from "../components/Icon";

export function LoginPage({
  onSignIn,
  isSigningIn,
  error,
}: {
  onSignIn: (email: string, password: string) => Promise<void>;
  isSigningIn: boolean;
  error: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onSignIn(email, password);
  };

  return (
    <div className="login-page">
      <main className="login-card-wrap">
        <div className="login-card">
          <div className="login-mobile-brand">
            <div className="brand-mark">
              <Icon name="spark" size={17} />
            </div>
            <span>
              RAG<span className="brand-dot">.</span>
            </span>
          </div>
          <div className="login-heading">
            <h1>Welcome back</h1>
            <p>Sign in to continue to your workspace.</p>
          </div>
          <button
            className="sso-button"
            type="button"
            disabled
            title="Google sign-in is not configured"
          >
            Continue with Google
          </button>
          <div className="divider">
            <span>or continue with email</span>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              Email address
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            {error && (
              <p className="api-feedback error" role="alert">
                {error}
              </p>
            )}
            <button
              className="button primary login-submit"
              disabled={isSigningIn}
            >
              {isSigningIn ? "Signing in..." : "Sign in"}
              {!isSigningIn && <Icon name="arrow" size={16} />}
            </button>
          </form>
          <p className="demo-note">
            <Icon name="spark" size={13} /> The API login is a placeholder;
            credentials are not validated and no session token is issued.
          </p>
        </div>
      </main>
    </div>
  );
}
