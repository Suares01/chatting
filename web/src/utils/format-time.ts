import * as dayjs from "dayjs";

export function formatTime(time: Date | string) {
  const date = dayjs(time).format("HH:mm");

  return date;
}
