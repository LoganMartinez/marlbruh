import { notifications } from "@mantine/notifications";
import { stringToIconObject } from "./constants";
import { IconHome } from "@tabler/icons-react";

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

export const stringToIcon = (iconString: string): JSX.Element => {
  let ret = <IconHome />;
  Object.keys(stringToIconObject).forEach((key) => {
    if (key === iconString) {
      ret = stringToIconObject[key];
    }
  });
  return ret;
};

export function arraysEqual(a: Array<any>, b: Array<any>) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export const replaceUnicodeChars = (str: string) => {
  return str.replace(/[‘’]/g, "'").replace(/[“”“”]/g, '"');
};
