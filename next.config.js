/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Helps identify potential issues in React components
  env: {
    JWT_SECRET: process.env.JWT_SECRET, // Exposes environment variables to the app
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Wildcard to allow all domains temporarily
        pathname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*", // Apply headers to all API routes
        headers: [
          {
            key: "Cache-Control",
            value: "no-store", // Ensures sensitive data is not cached
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self';", // Example CSP header, adjust as needed
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
  