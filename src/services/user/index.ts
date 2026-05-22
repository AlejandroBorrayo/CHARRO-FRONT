import { apiClient } from "@/lib/apiClient";
import type { UserCollectionInterface } from "@/type/user.interface";
import { PageMetaDto } from "@/type/general";

export const getUser = async (
  userid: string
): Promise<UserCollectionInterface> => {
  const { data } = await apiClient.get(`/user/${userid}`);
  return data;
};

export const findAllUsers = async (
  userid: string,
  pagination: { page: number; perpage: number },
  search: string
): Promise<PageMetaDto<UserCollectionInterface>> => {
  const { data } = await apiClient.post("/user/all", {
    userid,
    pagination,
    search,
  });
  return data;
};

export const updateUser = async (
  userid: string,
  user?: Partial<UserCollectionInterface>
): Promise<UserCollectionInterface> => {
  const { data } = await apiClient.put(`/user/${userid}`, { ...(user ?? {}) });
  return data;
};

export const inviteUser = async (
  name: string,
  email: string
): Promise<UserCollectionInterface> => {
  const { data } = await apiClient.post("/invite", { name, email });
  return data;
};

export const register = async (
  invite: string,
  user: Partial<UserCollectionInterface>
): Promise<UserCollectionInterface> => {
  const { data } = await apiClient.post("/invite/accept", { ...user, invite });
  return data;
};
