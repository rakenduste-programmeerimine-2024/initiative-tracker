"use client";

import { useRouter } from "next/navigation"; // For client-side navigation
import { createClient } from "@/utils/supabase/client";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function Login(props: { searchParams: Promise<Message> }) {
  const router = useRouter(); // Use Next.js router for navigation
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message); // Display error message
    } else {
      // Refresh or redirect after successful login
      router.push("/"); // Redirect to the main page
      router.refresh(); // Dynamically update the page without reload
    }
  };

  return (
    <div className="p-8 rounded-md shadow-lg max-w-lg mx-auto mt-10 bg-[#1c1c1e] border border-[#2c2c2e]">
      <h1 className="text-3xl font-bold mb-2 text-center text-[#e63946]">Sign In</h1>
      <p className="text-center text-sm text-[#f4f4f5] mb-6">
        Don't have an account?{" "}
        <Link className="text-[#e63946] font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <form className="space-y-6" onSubmit={handleSignIn}>
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-[#f4f4f5]">
            Email
          </Label>
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="something@mail.com"
            required
            className="block w-full px-4 py-2 rounded-md bg-[#2c2c2e] text-[#f4f4f5] border border-[#3c3c3e]"
          />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-sm font-medium text-[#f4f4f5]">
              Password
            </Label>
            <Link
              className="text-xs text-[#e63946] underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
            className="block w-full px-4 py-2 rounded-md bg-[#2c2c2e] text-[#f4f4f5] border border-[#3c3c3e]"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-9 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
