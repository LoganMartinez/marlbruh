import { Avatar, Group, Text } from "@mantine/core";
import { forwardRef } from "react";

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
      profileColor,
      ...others
    }: ItemProps,
    ref
  ) => (
    <div ref={ref} {...others}>
      <Group>
        <Avatar src={profilePic} color="blue" />
        <Text>{value}</Text>
      </Group>
    </div>
  )
);
