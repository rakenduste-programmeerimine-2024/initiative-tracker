"use client"

import { useCallback, useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { fetchResource, updateResource } from "@/utils/api/api-client"
import Avatar from "@/app/profile/avatar"

type Profile = {
  id: string
  full_name: string | null
  username: string | null
  avatar_url: string | null
}

export default function ProfileDetails({ user }: { user: User | null }) {
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true)

      const profile = await fetchResource<Profile>(`/api/profiles/${user?.id}`)

      setFullname(profile.full_name)
      setUsername(profile.username)
      setAvatarUrl(profile.avatar_url)
    } catch (err: any) {
      console.error("Error fetching profile:", err.message)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) fetchProfile()
  }, [user, fetchProfile])

  const updateProfile = async () => {
    try {
      setLoading(true)

      const updatedProfile = {
        full_name: fullname,
        username,
        avatar_url: avatarUrl,
      }

      await updateResource<Profile, typeof updatedProfile>(
        `/api/profiles/${user?.id}`,
        updatedProfile,
      )

      alert("Profile updated!")
    } catch (err: any) {
      console.error("Error updating profile:", err.message)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarUpload = (filePath: string) => {
    setAvatarUrl(filePath)
    updateProfile()
  }

  return (
    <div className="p-8 rounded-md shadow-lg max-w-lg mx-auto mt-12 bg-[#1c1c1e] border border-[#2c2c2e]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#e63946]">
        Your Profile
      </h1>

      <div className="mb-6 flex justify-center">
        <Avatar
          uid={user?.id || ""}
          url={avatarUrl}
          size={150}
          onUpload={handleAvatarUpload}
        />
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#f4f4f5]">
            Email
          </label>
          <input
            type="text"
            value={user?.email || ""}
            disabled
            className="block w-full px-4 py-2 rounded-md bg-[#2c2c2e] text-[#f4f4f5] border border-[#3c3c3e]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-[#f4f4f5]">
            Full Name
          </label>
          <input
            type="text"
            value={fullname || ""}
            onChange={e => setFullname(e.target.value)}
            className="block w-full px-4 py-2 rounded-md bg-[#2c2c2e] text-[#f4f4f5] border border-[#3c3c3e]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-[#f4f4f5]">
            Username
          </label>
          <input
            type="text"
            value={username || ""}
            onChange={e => setUsername(e.target.value)}
            className="block w-full px-4 py-2 rounded-md bg-[#2c2c2e] text-[#f4f4f5] border border-[#3c3c3e]"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={updateProfile}
            disabled={loading}
            className={`px-6 py-2 rounded-md shadow-md text-white ${
              loading
                ? "bg-[#3c3c3e] cursor-not-allowed"
                : "bg-[#e63946] hover:bg-[#d62839]"
            }`}
          >
            {loading ? "Loading..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  )
}
