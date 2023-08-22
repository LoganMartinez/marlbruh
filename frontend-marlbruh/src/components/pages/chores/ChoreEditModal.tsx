import {
  Autocomplete,
  Button,
  Modal,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { getAllUsers, updateChore } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { UserAutoCompleteItem } from "./UserAutoCompleteItem";
import { IconPicker } from "./IconPicker";
import {
  errorNotification,
  successNotification,
} from "../../../utilities/helperFunctions";

type Props = {
  chore: Chore;
  opened: boolean;
  openHandlers: DisclosureHandler;
  setChoresUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

type Form = {
  name: string | undefined;
  icon: string | undefined;
  username: string | undefined;
  complete: boolean | undefined;
  description: string | undefined;
};

const ChoreEditModal = ({
  chore,
  opened,
  openHandlers,
  setChoresUpdated,
}: Props) => {
  const auth = useAuth();
  const [userDisplay, setUserDisplay] = useState(
    chore.user ? chore.user.username : ""
  );
  const [allUsers, setAllUsers] = useState([] as User[]);
  const form = useForm({
    initialValues: {
      name: undefined,
      icon: undefined,
      username: undefined,
      complete: undefined,
      description: undefined,
    } as Form,
    validate: {
      name: (value) => {
        if (value === undefined) {
          return null;
        }
        if (value === "") {
          return "Name can't be empty";
        }
        if (value.length > 50) {
          return "Name must be less than 50 characters";
        }
        return null;
      },
      description: (value) =>
        value && value.length > 150
          ? "Description must be 150 characters or less"
          : null,
    },
  });

  useEffect(() => {
    getAllUsers(auth.authToken).then(({ data: users }) =>
      setAllUsers(users as User[])
    );
  }, []);

  const submitForm = (values: Form) => {
    const usersWithUsername = allUsers.filter(
      (u) => u.username === values.username
    );
    const userId =
      usersWithUsername.length === 1 ? usersWithUsername[0].userId : undefined;
    updateChore(
      chore.id,
      auth.authToken,
      values.name,
      values.icon,
      userId,
      values.complete,
      values.description === "" ? null : values.description
    )
      .then(({ data: updatedChore }) => {
        successNotification(`Chore "${updatedChore.name} updated!`);
        setChoresUpdated(true);
        openHandlers.close();
      })
      .catch((err) => errorNotification(err));
  };

  const userChange = (username: string) => {
    if (chore.user && username === chore.user.username) {
      form.setFieldValue("username", undefined);
    } else {
      const usersWithUsername = allUsers.filter(
        (user) => user.username === username
      );
      if (usersWithUsername.length === 1) {
        form.setFieldValue("username", username);
      } else {
        form.setFieldValue("username", undefined);
      }
    }

    setUserDisplay(username);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        form.reset();
        openHandlers.close();
      }}
      title={`Edit Chore: "${chore.name}"`}
    >
      <form onSubmit={form.onSubmit((values) => submitForm(values))}>
        <Stack>
          <TextInput
            label="Chore Name"
            {...form.getInputProps("name")}
            value={
              form.values.name === undefined ? chore.name : form.values.name
            }
            onChange={(e) => {
              form.setFieldValue(
                "name",
                e.target.value === chore.name ? undefined : e.target.value
              );
            }}
          />
          <Textarea
            label="Description"
            value={
              form.values.description === undefined
                ? chore.description === null
                  ? ""
                  : chore.description
                : form.values.description
            }
            onChange={(event) => {
              form.setFieldValue(
                "description",
                event.target.value === chore.description
                  ? undefined
                  : event.target.value
              );
            }}
          />
          <div>
            <Text>Icon</Text>
            <IconPicker
              selected={form.values.icon || chore.icon}
              setSelected={(icon) => {
                form.setFieldValue(
                  "icon",
                  icon === chore.icon ? undefined : icon
                );
              }}
            />
          </div>
          <Autocomplete
            label="Assigned user"
            itemComponent={UserAutoCompleteItem}
            data={allUsers.map((user) => ({ value: user.username, ...user }))}
            dropdownPosition="bottom"
            withinPortal
            {...form.getInputProps("username")}
            value={userDisplay}
            onChange={userChange}
          />
          {Object.values(form.values).every((val) => val === undefined) ? (
            <Button onClick={openHandlers.close}>Cancel</Button>
          ) : (
            <Stack>
              <Button
                color="red"
                onClick={() => {
                  openHandlers.close();
                  form.reset();
                }}
              >
                Discard Changes
              </Button>
              <Button type="submit">Save Changes</Button>
            </Stack>
          )}
        </Stack>
      </form>
    </Modal>
  );
};

export default ChoreEditModal;
