import { useQuery } from "react-query";
import { authAxios } from "../../../libs/axios";
import { NotificationProps } from "../notifications-slice";

type GetNotificationsResponse = NotificationProps[];

interface GetNotificationsBaseResponse {
  notifications: GetNotificationsResponse;
}

export function useGetNotifications() {
  return useQuery<GetNotificationsResponse>(
    ["user:notifications"],
    async () => {
      const { data } = await authAxios.get<GetNotificationsBaseResponse>(
        "/notifications"
      );
      return data.notifications;
    }
  );
}
