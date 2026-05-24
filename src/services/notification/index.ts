import { apiClient } from "@/lib/apiClient";

export type SendNotificationPayload = {
  userid: string;
  title: string;
  subject: string;
  description: string;
  user_ids: string[];
};

export const sendNotification = async (
  payload: SendNotificationPayload
): Promise<{ message?: string }> => {
  const { data } = await apiClient.post("/notification/send", payload);
  return data;
};
