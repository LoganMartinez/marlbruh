import { Box, Container, Loader, SimpleGrid } from "@mantine/core";
import ComingSoon from "../reusablePages/ComingSoon";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";
import UserHandle from "../../reusableComponents/UserHandle";

const Kudos = () => {
  const auth = useAuth();
  const [allUsers, setAllUsers] = useState([] as User[]);

  useEffect(() => {
    getAllUsers(auth.authToken)
      .then(({ data: users }) => {
        setAllUsers(users);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  }, []);

  return (
    <>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {allUsers ? (
          allUsers.map((user) => (
            <Box key={user.userId}>
              <Container p="md">
                <UserHandle user={user} />
              </Container>
            </Box>
          ))
        ) : (
          <Loader />
        )}
      </SimpleGrid>
    </>
  );
};

export default Kudos;
