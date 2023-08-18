import { Avatar, Menu } from "@mantine/core";
import { useAuth } from "../../authentication/AuthContext";
import { IconLogout } from "@tabler/icons-react";
import { API_URL } from "../../utilities/constants";

const ProfileMenu = () => {
  const auth = useAuth();

  return (
    <>
      <Menu>
        <Menu.Target>
          <Avatar
            src={`${API_URL}${auth.currentUser?.profilePic}`}
            color="blue"
            style={{ cursor: "pointer" }}
            radius="xl"
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{auth.currentUser?.username}</Menu.Label>
          <Menu.Item
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
