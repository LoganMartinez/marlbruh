import { Avatar, Group, Text } from "@mantine/core";
import { forwardRef } from "react";

type ItemProps = React.ComponentPropsWithoutRef<"div"> & Book;

const BookSelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ coverImage, title, id, cssStyles, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={coverImage} />
        <Text size="md">{title}</Text>
      </Group>
    </div>
  )
);
export default BookSelectItem;
