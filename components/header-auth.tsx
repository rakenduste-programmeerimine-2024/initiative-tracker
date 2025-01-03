"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { type User } from "@supabase/supabase-js";

export default function HeaderAuth() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        setUser(data.user);
      }
    }

    fetchUser();
  }, [supabase]);

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <Link href="/profile">
            <div
              className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center cursor-pointer hover:bg-gray-400"
              title="Go to Profile"
            >
              <span className="text-sm text-white font-bold">
                {user.email?.charAt(0).toUpperCase() || "?"}
              </span>
            </div>
          </Link>
          {/* Sign out */}
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.reload();
            }}
            className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          {/* Sign in and sign out */}
          <Link href="/sign-in" className="text-sm text-gray-300 hover:underline">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-sm text-red-500 hover:underline">
            Get Started
          </Link>
        </>
      )}
    </div>
  );
}