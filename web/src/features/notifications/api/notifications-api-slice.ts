import { apiSlice } from "../../query";
import { NotificationProps } from "../notifications-slice";

type GetNotificationsResponse = NotificationProps[];

interface GetNotificationsBaseResponse {
  notifications: GetNotificationsResponse;
}

const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<GetNotificationsResponse, undefined>({
      query: () => "notifications",
      transformResponse(value: GetNotificationsBaseResponse) {
        return value.notifications;
      },
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsApiSlice;
