import Link from "next/link";

export default function Index() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 text-center rounded-2xl bg-[#1c1c1e]">
      <div className="max-w-2xl p-6">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to the D&D Initiative Tracker!</h1>

        <p className="text-lg text-gray-300 mb-6">
          Simplify your Dungeons & Dragons gameplay with our advanced initiative tracker. Manage initiative and combat with ease.
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
          <Link
            href="/tracker"
            className="px-6 py-3 bg-[#6a040f] text-white font-semibold rounded-sm shadow-md hover:bg-[#8a0511] transition"
          >
            Start Tracking
          </Link>
        </div>
      </div>
    </main>
  );
}
