import { Avatar, Menu } from "@mantine/core";
import { useAuth } from "../../authentication/AuthContext";
import { IconLogout, IconUser } from "@tabler/icons-react";

const ProfileMenu = () => {
  const auth = useAuth();

  return (
    <>
      <Menu>
        <Menu.Target>
          <Avatar
            src={auth.currentUser.profilePic}
            color="blue"
            style={{ cursor: "pointer" }}
            radius="xl"
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{auth.currentUser?.username}</Menu.Label>
          <Menu.Item
            component="a"
            href={`#/users/${auth.currentUser?.username}`}
            icon={<IconUser size="1rem" />}
          >
            View Profile
          </Menu.Item>
          <Menu.Item
            component="a"
            href={"/"}
            icon={<IconLogout size="1rem" />}
            onClick={() => auth.clearAuthToken()}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default ProfileMenu;
