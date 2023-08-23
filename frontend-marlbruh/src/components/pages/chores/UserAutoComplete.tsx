import {
  Avatar,
  Box,
  CloseButton,
  Group,
  MultiSelectValueProps,
  Text,
} from "@mantine/core";
import { forwardRef } from "react";
import { profileColors } from "../../../utilities/constants";

interface ItemProps {
  value: string;
  profilePic: string;
  profileColor: string;
}

export const UserAutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, profilePic, profileColor, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group>
        <Avatar src={profilePic} color="blue" />
        <Text>{value}</Text>
      </Group>
    </div>
  )
);

export function UserAutoCompleteValue({
  value,
  profilePic,
  profileColor,
  onRemove,
  classNames,
  ...others
}: MultiSelectValueProps & ItemProps) {
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          backgroundColor: profileColors[profileColor],
          borderRadius: theme.radius.lg,
        })}
      >
        <Group spacing="xs" p=".3rem" position="apart">
          <Group spacing=".3rem" position="left">
            <Avatar size="sm" radius="xl" src={profilePic} color="blue" />
            <Text>{value}</Text>
          </Group>
          <CloseButton onClick={onRemove} />
        </Group>
      </Box>
    </div>
  );
}
