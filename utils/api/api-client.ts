import { getAuthToken } from "@/utils/api/token-utils"

export async function fetchMultipleResources<T>(url: string): Promise<T[]> {
  const token = await getAuthToken()
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Error fetching resources: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchByForeignKey<T>(
  url: string,
  foreignKey: string,
  value: string,
): Promise<T[]> {
  const query = new URLSearchParams({ [foreignKey]: value }).toString()
  const fullUrl = `${url}?${query}`

  return fetchMultipleResources<T>(fullUrl)
}

export async function fetchResource<T>(url: string): Promise<T> {
  const token = await getAuthToken()
  console.log(token)
  console.log(url)
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Error fetching resource: ${response.statusText}`)
  }

  return response.json()
}

export async function createResource<T, U>(url: string, data: U): Promise<T> {
  const token = await getAuthToken()
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Error creating resource: ${response.statusText}`)
  }

  return response.json()
}

export async function updateResource<T, U>(url: string, data: U): Promise<T> {
  const token = await getAuthToken()
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Error updating resource: ${response.statusText}`)
  }

  return response.json()
}

export async function deleteResource(url: string): Promise<void> {
  const token = await getAuthToken()
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Error deleting resource: ${response.statusText}`)
  }
}
