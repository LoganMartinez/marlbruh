import { Avatar, Button, Center, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../authentication/AuthContext";
import { getUser } from "../../../api/apiCalls";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";
import { API_URL } from "../../../utilities/constants";
import { useViewportSize } from "@mantine/hooks";
import EditUserPage from "./EditUserPage";

const UserPage = () => {
  const auth = useAuth();
  const { username } = useParams();
  const [user, setUser] = useState(undefined as User | undefined);
  const [editProfile, setEditProfile] = useState(false);
  const windowWidth = useViewportSize().width;
  const isCurrentUser = auth.currentUser?.username === username;

  useEffect(() => {
    if (isCurrentUser) {
      setUser(auth.currentUser);
    } else if (username) {
      getUser(username, auth.authToken)
        .then(({ data: user }) => {
          setUser(user);
        })
        .catch((err: AxiosError) => {
          setUser(undefined);
          if (err.response?.status !== 404) {
            errorNotification(err.response?.statusText);
          }
        });
    }
  }, [username]);

  return (
    <>
      {user ? (
        <>
          {editProfile ? (
            <EditUserPage setEditProfile={setEditProfile} />
          ) : (
            <>
              <Center>
                <Stack w={windowWidth >= 600 ? "50%" : "100%"}>
                  <Title align="center">{user.username}</Title>
                  <Avatar
                    size="100%"
                    radius="xl"
                    src={`${API_URL}${user.profilePic}`}
                    color="blue"
                  />
                  <Text>
                    <b>Date Joined: </b>
                    {new Date(user.dateJoined).toDateString()}
                  </Text>
                  {isCurrentUser ? (
                    <Button
                      w="100%"
                      onClick={() => {
                        setEditProfile(true);
                      }}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <></>
                  )}
                </Stack>
              </Center>
            </>
          )}
        </>
      ) : (
        <Title>User Not Found</Title>
      )}
    </>
  );
};

export default UserPage;
