"use client";

import { useState } from "react";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { login } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await login({ username, password });
      if (res.error) {
        setError((res.error as any).message || "Invalid credentials");
      } else {
        router.push("/admin/tenant");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-100 p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Nishify Studio</h1>
          <p className="text-sm text-slate-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-slate-700 font-semibold">Username</Label>
            <Input
              id="username"
              value={username}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700 font-semibold">Password</Label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 h-11"
            />
          </div>

          {error && <div className="text-red-500 text-sm font-medium pt-1">{error}</div>}

          <Button type="submit" className="w-full h-11 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold" disabled={busy}>
            {busy ? (
              <span className="flex items-center gap-2">
                <LoaderCircleIcon className="animate-spin h-4 w-4" /> Authenticating...
              </span>
            ) : "Authenticate"}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="bg-slate-900 rounded-lg p-5 text-center shadow-inner">
            <h3 className="text-blue-400 font-bold mb-2 flex justify-center items-center gap-2 text-sm uppercase tracking-wider">
              Infrastructure Center
            </h3>
            <p className="text-xs text-slate-400 px-2 leading-relaxed">
              Login to access the SuperAdmin Database Control Center. Configure multi-tenant routing, database schemas, and external API integrations.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
