import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

async function apiFetch(
  path: string,
  {
    method = "GET",
    token,
    body,
  }: { method?: string; token?: string | null; body?: any }
) {
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (body) headers["Content-Type"] = "application/json";
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 404) {
    const error: any = new Error("Profile not found");
    error.status = 404;
    throw error;
  }
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  if (res.status === 204) return null;
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export function useProfileQuery(profileUserId: string, token: string | null) {
  return useQuery({
    queryKey: ["profile", profileUserId],
    enabled: !!profileUserId,
    queryFn: async () => apiFetch(`/api/profiles/${profileUserId}`, { token }),
  });
}

export function useProfileUpdateMutation(
  profileUserId: string,
  token: string | null
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; bio: string }) =>
      apiFetch(`/api/profiles/${profileUserId}`, {
        method: "PUT",
        token,
        body: data,
      }),
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["profile", profileUserId] });
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });
}

export function useProfileCreateMutation(token: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      name,
      bio,
    }: {
      userId: string;
      name: string;
      bio: string;
    }) =>
      apiFetch(`/api/profiles`, {
        method: "POST",
        token,
        body: { clerkId: userId, name, bio },
      }),
    onSuccess: (_data, variables) => {
      toast.success("Profile created");
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.userId],
      });
    },
    onError: () => {
      toast.error("Failed to create profile");
    },
  });
}

export function useSongsQuery(profileUserId: string, token: string | null) {
  return useQuery({
    queryKey: ["songs", profileUserId],
    enabled: !!profileUserId,
    queryFn: async () =>
      apiFetch(`/api/profiles/songs?userId=${profileUserId}`, { token }),
  });
}

export function useSongMutation(token: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      url: string;
      category: string;
      userId: string;
    }) =>
      apiFetch(`/api/profiles/songs`, {
        method: "POST",
        token,
        body: data,
      }),
    onSuccess: (_data, variables) => {
      toast.success("Song added");
      queryClient.invalidateQueries({ queryKey: ["songs", variables.userId] });
    },
    onError: () => {
      toast.error("Failed to add song");
    },
  });
}

export function useSongUpdateMutation(token: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      songId: number;
      name: string;
      url: string;
      category: string;
      userId: string;
    }) =>
      apiFetch(`/api/profiles/songs/${data.songId}`, {
        method: "PUT",
        token,
        body: {
          name: data.name,
          url: data.url,
          category: data.category,
        },
      }),
    onSuccess: (_data, variables) => {
      toast.success("Song updated");
      queryClient.invalidateQueries({ queryKey: ["songs", variables.userId] });
    },
    onError: () => {
      toast.error("Failed to update song");
    },
  });
}

export function useSongDeleteMutation(token: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { songId: number; userId: string }) =>
      apiFetch(`/api/profiles/songs/${data.songId}`, {
        method: "DELETE",
        token,
      }).then(() => true),
    onSuccess: (_data, variables) => {
      toast.success("Song deleted");
      queryClient.invalidateQueries({ queryKey: ["songs", variables.userId] });
    },
    onError: () => {
      toast.error("Failed to delete song");
    },
  });
}
