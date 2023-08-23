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
import { createChore, getAllUsers } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import {
  UserAutoCompleteItem,
  UserAutoCompleteValue,
} from "./UserAutoComplete";
import { IconPicker } from "./IconPicker";
import {
  errorNotification,
  successNotification,
} from "../../../utilities/helperFunctions";

type Props = {
  opened: boolean;
  openHandlers: DisclosureHandler;
  setChoresUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

type Form = {
  name: string;
  icon: string;
  usernames: string[];
  description: string | undefined;
};

const ChoreCreationModal = ({
  opened,
  openHandlers,
  setChoresUpdated,
}: Props) => {
  const auth = useAuth();
  const [allUsers, setAllUsers] = useState([] as User[]);
  const form = useForm({
    initialValues: {
      name: "",
      icon: "home",
      usernames: [],
      description: undefined,
    } as Form,
    validate: {
      name: (value) => {
        if (!value) {
          return "Name is required";
        }
        if (value.length > 50) {
          return "Name must be less than 50 characters";
        }
        return null;
      },
      description: (value) =>
        value && value.length > 150
          ? "description must be 150 characters or less"
          : null,
    },
  });

  useEffect(() => {
    getAllUsers(auth.authToken).then(({ data: users }) =>
      setAllUsers(users as User[])
    );
  }, []);

  const submitForm = (values: Form) => {
    const userIds = allUsers
      .filter((u) => values.usernames.includes(u.username))
      .map((user) => user.userId);
    createChore(
      values.name,
      values.icon,
      userIds,
      values.description,
      auth.authToken
    )
      .then(({ data: createdChore }) => {
        successNotification(`New chore "${createdChore.name}" created!`);
        setChoresUpdated(true);
        form.reset();
        openHandlers.close();
      })
      .catch((err) => errorNotification(err));
  };

  return (
    <Modal opened={opened} onClose={openHandlers.close} title="Create Chore">
      <form onSubmit={form.onSubmit((values) => submitForm(values))}>
        <Stack>
          <TextInput
            withAsterisk
            label="Chore Name"
            {...form.getInputProps("name")}
          />
          <Textarea
            label="Description"
            {...form.getInputProps("description")}
            onChange={(event) => {
              if (event.target.value === "") {
                form.setFieldValue("description", undefined);
              } else {
                form.setFieldValue("description", event.target.value);
              }
            }}
          />
          <div>
            <Text>Icon</Text>
            <IconPicker
              selected={form.values.icon}
              setSelected={(icon) => form.setFieldValue("icon", icon)}
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
          />
          {/* <Autocomplete
            label="Assigned user"
            itemComponent={UserAutoCompleteItem}
            data={allUsers.map((user) => ({ value: user.username, ...user }))}
            dropdownPosition="bottom"
            withinPortal
            {...form.getInputProps("username")}
          /> */}
          <Button type="submit">Create</Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default ChoreCreationModal;
