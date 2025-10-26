"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid password");
      } else {
        router.push("/update");
      }
    } catch (error) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="w-full max-w-md">
        <div className="bg-pure-white shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-gold/10 rounded-full">
              <Lock className="w-8 h-8 text-gold" />
            </div>
          </div>

          <h1 className="text-2xl font-display text-center mb-8">
            Admin Panel Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-display uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-charcoal/20 focus:border-gold focus:outline-none transition-colors"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="p-4 bg-terracotta/20 border-2 border-terracotta text-charcoal">
                <p className="text-sm font-display">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-gold text-charcoal font-display uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-charcoal/60">
            Authorized access only
          </p>
        </div>
      </div>
    </div>
  );
}
