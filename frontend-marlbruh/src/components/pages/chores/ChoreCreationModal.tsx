import {
  Autocomplete,
  Button,
  Modal,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { createChore, getAllUsers } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { UserAutoCompleteItem } from "./UserAutoCompleteItem";
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
  username: string;
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
      username: "",
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
    createChore(values.name, values.icon, userId, auth.authToken)
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
          <TextInput label="Chore Name" {...form.getInputProps("name")} />
          <div>
            <Text>Icon</Text>
            <IconPicker
              selected={form.values.icon}
              setSelected={(icon) => form.setFieldValue("icon", icon)}
            />
          </div>
          <Autocomplete
            label="Assigned user"
            itemComponent={UserAutoCompleteItem}
            data={allUsers.map((user) => ({ value: user.username, ...user }))}
            dropdownPosition="bottom"
            withinPortal
            {...form.getInputProps("username")}
          />
          <Button type="submit">Create</Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default ChoreCreationModal;
