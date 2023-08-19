import { notifications } from "@mantine/notifications";

export const errorNotification = (error: string | undefined) => {
  notifications.show({
    title: "Error",
    message: error ? error : "Something went wrong",
    autoClose: 5000,
    color: "red",
    withCloseButton: true,
  });
};

export const successNotification = (message: string) => {
  notifications.show({
    title: "Success",
    message: message,
    autoClose: 5000,
    color: "green",
    withCloseButton: true,
  });
};
