import {
  Avatar,
  Button,
  Center,
  Paper,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../authentication/AuthContext";
import { getUser } from "../../../api/apiCalls";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";
import { profileColors } from "../../../utilities/constants";
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
              <Paper
                style={{
                  backgroundColor: profileColors[user.profileColor],
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                <Center>
                  <Stack align="center" w={windowWidth >= 600 ? "50%" : "100%"}>
                    <Title align="center">{user.username}</Title>
                    <Avatar
                      size="100%"
                      radius="xl"
                      src={auth.currentUser.profilePic}
                      color={profileColors[user.profileColor]}
                    />
                    <Text>
                      <b>Date Joined: </b>
                      {new Date(user.dateJoined).toDateString()}
                    </Text>
                  </Stack>
                </Center>
              </Paper>
              <Space h="xl" />
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
