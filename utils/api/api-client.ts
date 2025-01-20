import { getAuthToken } from "@/utils/api/token-utils"

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = await getAuthToken()
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...options.headers,
  }

  const response = await fetch(url, { ...options, headers })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(
      `Error: ${response.status} ${response.statusText} - ${errorBody}`,
    )
  }

  return response.json()
}

export async function fetchMultipleResources<T>(
  url: string,
): Promise<{ success: boolean; data: T[] }> {
  return await request<{ success: boolean; data: T[] }>(url)
}

export async function fetchByForeignKey<T>(
  baseUrl: string,
  foreignKey: string,
  value: string,
): Promise<{ success: boolean; data: T[] }> {
  const fullUrl =
    foreignKey === "path"
      ? `${baseUrl}/${value}`
      : `${baseUrl}?${new URLSearchParams({ [foreignKey]: value }).toString()}`

  return await fetchMultipleResources<T>(fullUrl)
}

export async function fetchResource<T>(url: string): Promise<T> {
  return await request<T>(url)
}

export async function createResource<T, U>(url: string, data: U): Promise<T> {
  return await request<T>(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateResource<T, U>(url: string, data: U): Promise<T> {
  return await request<T>(url, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteResource(url: string): Promise<void> {
  await request<void>(url, { method: "DELETE" })
}
