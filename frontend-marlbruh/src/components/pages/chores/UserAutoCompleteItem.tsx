import { Avatar, Group, Text } from "@mantine/core";
import { forwardRef } from "react";
import { API_URL } from "../../../utilities/constants";

interface ItemProps extends User {
  value: string;
}

export const UserAutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      value,
      username,
      profilePic,
      dateJoined,
      isSuperuser,
      userId,
      ...others
    }: ItemProps,
    ref
  ) => (
    <div ref={ref} {...others}>
      <Group>
        <Avatar src={`${API_URL}${profilePic}`} color="blue" />
        <Text>{value}</Text>
      </Group>
    </div>
  )
);
