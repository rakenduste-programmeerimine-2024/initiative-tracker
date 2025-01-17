import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="p-8 rounded-md shadow-lg max-w-lg mx-auto mt-10 bg-[#1c1c1e] border border-[#2c2c2e]">
      <h1 className="text-3xl font-bold mb-2 text-center text-[#e63946]">Sign In</h1>
      <p className="text-center text-sm text-[#f4f4f5] mb-6">
        Don't have an account?{" "}
        <Link className="text-[#e63946] font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <form className="space-y-6">
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-[#f4f4f5]">
            Email
          </Label>
          <Input
            name="email"
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
            placeholder="Your password"
            required
            className="block w-full px-4 py-2 rounded-md bg-[#2c2c2e] text-[#f4f4f5] border border-[#3c3c3e]"
          />
        </div>
        <div className="flex justify-center">
          <SubmitButton
            pendingText="Signing In..."
            formAction={signInAction}
            className="px-8 py-5 bg-red-600 text-white hover:bg-red-700 rounded"
          >
            Sign In
          </SubmitButton>
        </div>
        <FormMessage message={searchParams} />
      </form>
    </div>
  );
}
