import { Stack, Title } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";

const ErrorPage = () => {
  return (
    <Stack align="center">
      <IconMoodSad size="8rem" />
      <Title align="center">Something went wrong</Title>
    </Stack>
  );
};

export default ErrorPage;
