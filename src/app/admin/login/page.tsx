"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    null,
  );

  return (
    <main className="admin-auth">
      <form action={formAction} className="admin-auth__card">
        <p className="admin-auth__brand">PATEL · Admin</p>
        <h1 className="admin-auth__title">Sign in</h1>
        <p className="admin-auth__sub">Manage content, team, and leads.</p>

        <label className="admin-field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="admin-field">
          <span>Password</span>
          <input name="password" type="password" autoComplete="current-password" required />
        </label>

        {state?.error && (
          <p className="admin-error" role="alert">{state.error}</p>
        )}

        <button type="submit" className="admin-btn" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
