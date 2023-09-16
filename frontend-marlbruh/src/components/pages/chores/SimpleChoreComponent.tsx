import { Box, Container, Group, Title } from "@mantine/core";
import { stringToIcon } from "../../../utilities/helperFunctions";
import { profileColors } from "../../../utilities/constants";
import { useAuth } from "../../../authentication/AuthContext";

// readonly chore component that doesn't show assigned to, used for home page overview

type Props = {
  chore: Chore;
};

const SimpleChoreComponent = ({ chore }: Props) => {
  const auth = useAuth();

  return (
    <>
      <Box
        sx={(theme) => ({
          backgroundColor: profileColors[auth.currentUser.profileColor],
          borderRadius: theme.radius.lg,
        })}
      >
        <Container p="xs">
          <Group position="left" spacing="xs" noWrap align="center">
            {stringToIcon(chore.icon)}
            <Title
              order={2}
              style={{
                flex: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {chore.name}
            </Title>
          </Group>
        </Container>
      </Box>
    </>
  );
};

export default SimpleChoreComponent;
