import { notifications } from "@mantine/notifications";

export const errorNotification = (error: string) => {
  notifications.show({
    title: "Error",
    message: error,
    autoClose: 5000,
    color: "red",
    withCloseButton: true,
  });
};
