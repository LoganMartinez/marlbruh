import {
  Button,
  Modal,
  MultiSelect,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { getAllUsers, updateChore } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import {
  UserAutoCompleteItem,
  UserAutoCompleteValue,
} from "./UserAutoComplete";
import { IconPicker } from "./IconPicker";
import {
  arraysEqual,
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
  usernames: string[] | undefined;
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
    chore.users.map((user) => user.username)
  );
  const [allUsers, setAllUsers] = useState([] as User[]);
  const form = useForm({
    initialValues: {
      name: undefined,
      icon: undefined,
      usernames: undefined,
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
    const userIds = values.usernames
      ? allUsers
          .filter((u) => values.usernames?.includes(u.username))
          .map((user) => user.userId)
      : undefined;
    updateChore(
      chore.id,
      auth.authToken,
      values.name,
      values.icon,
      userIds,
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

  const userChange = (usernames: string[]) => {
    if (arraysEqual(usernames, chore.users)) {
      form.setFieldValue("usernames", undefined);
    }
    form.setFieldValue("usernames", usernames);
    setUserDisplay(usernames);
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
          <MultiSelect
            label="Assigned user(s)"
            data={allUsers.map((user) => ({
              value: user.username,
              profilePic: user.profilePic,
              profileColor: user.profileColor,
            }))}
            itemComponent={UserAutoCompleteItem}
            valueComponent={UserAutoCompleteValue}
            dropdownPosition="bottom"
            withinPortal
            searchable
            filter={(value, selected, user) =>
              !selected &&
              user.value.toLowerCase().includes(value.toLowerCase().trim())
            }
            {...form.getInputProps("usernames")}
            value={userDisplay}
            onChange={userChange}
          />
          {/* <Autocomplete
            label="Assigned user"
            itemComponent={UserAutoCompleteItem}
            data={allUsers.map((user) => ({ value: user.username, ...user }))}
            dropdownPosition="bottom"
            withinPortal
            {...form.getInputProps("username")}
            value={userDisplay}
            onChange={userChange}
          /> */}
          {Object.values(form.values).every((val) => val === undefined) ? (
            <Button onClick={openHandlers.close}>Cancel</Button>
          ) : (
            <Stack>
              <Button
                color="red"
                onClick={() => {
                  openHandlers.close();
                  setUserDisplay(chore.users.map((user) => user.username));
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
