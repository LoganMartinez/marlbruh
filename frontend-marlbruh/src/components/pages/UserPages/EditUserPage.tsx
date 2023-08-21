import {
  Button,
  Center,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "../../../authentication/AuthContext";
import PfpDropzone from "../login/PfpDropzone";
import { FileWithPath } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import { updateUser } from "../../../api/apiCalls";
import { useNavigate } from "react-router-dom";
import {
  errorNotification,
  successNotification,
} from "../../../utilities/helperFunctions";
import { AxiosError } from "axios";
import ProfileColorSwatches from "../../reusableComponents/ProfileColorSwatches";

type Form = {
  username: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  profilePic: FileWithPath | undefined;
  profileColor: string | undefined;
};

type Props = {
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditUserPage = ({ setEditProfile }: Props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [currentPfp, setCurrentPfp] = useState(
    undefined as FileWithPath | undefined
  );
  const windowWidth = useViewportSize().width;
  const form = useForm({
    initialValues: {
      username: undefined,
      password: undefined,
      confirmPassword: undefined,
      profilePic: undefined,
      profileColor: undefined,
    } as Form,

    validate: {
      confirmPassword: (value, values) => {
        if (!values.password) {
          return null;
        }
        if (!value) {
          return "Confirm your password";
        }
        if (value !== values.password) {
          return "Passwords don't match";
        }
        return null;
      },
    },
  });

  // get current profile pic
  useEffect(() => {
    if (auth.currentUser.profilePic) {
      fetch(auth.currentUser.profilePic)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "current-pfp92837", {
            type: blob.type,
          });
          setCurrentPfp(file);
        })
        .catch((err) => {
          errorNotification(err);
        });
    }
  }, []);

  const submitForm = (values: Form) => {
    updateUser(
      auth.currentUser.username,
      auth.authToken,
      values.username,
      values.password,
      values.profilePic,
      values.profileColor
    )
      .then(() => {
        setEditProfile(false);
        const updatedUsername = values.username
          ? values.username
          : auth.currentUser.username;
        navigate(`/users/${updatedUsername}`);
        successNotification(
          "Changes applied! You may need to refresh to see changes."
        );
      })
      .catch((err: AxiosError) => {
        console.error(err);
        if (err.response?.status === 409) {
          errorNotification("That username is already taken");
        }
        errorNotification(err.message);
      });
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => submitForm(values))}>
        <Center>
          <Stack w={windowWidth >= 600 ? "50%" : "100%"}>
            <Title align="center">Edit Profile</Title>
            <Stack spacing="md" align="flex-start">
              <TextInput
                label="Username"
                placeholder="Username"
                style={{ width: "100%" }}
                {...form.getInputProps("username")}
                value={form.values.username || auth.currentUser?.username}
                onChange={(event) => {
                  const usernameValue =
                    event.target.value === auth.currentUser.username
                      ? undefined
                      : event.target.value;
                  form.setFieldValue("username", usernameValue);
                }}
              />
              <PasswordInput
                w="100%"
                label="Password"
                {...form.getInputProps("password")}
                value={form.values.password || ""}
                onChange={(event) => {
                  if (event.target.value === "") {
                    form.setFieldValue("password", undefined);
                  } else {
                    form.setFieldValue("password", event.target.value);
                  }
                }}
              />
              <PasswordInput
                withAsterisk={form.values.password !== undefined}
                w="100%"
                label="Confirm Password"
                {...form.getInputProps("confirmPassword")}
                value={form.values.confirmPassword || ""}
              />
              <Text>
                <b>Profile Picture</b>
              </Text>
              <PfpDropzone
                value={form.values.profilePic || currentPfp}
                setValue={(pfp) => {
                  setCurrentPfp(undefined);
                  form.setFieldValue("profilePic", pfp);
                }}
              />
              <Text>
                <b>Profile Color</b>
              </Text>
              <ProfileColorSwatches
                selectedColor={
                  form.values.profileColor || auth.currentUser.profileColor
                }
                setSelectedColor={(color) => {
                  form.setFieldValue(
                    "profileColor",
                    auth.currentUser.profileColor === color ? undefined : color
                  );
                }}
              />

              {Object.values(form.values).every(
                (value) => value === undefined
              ) ? (
                <Button w="100%" onClick={() => setEditProfile(false)}>
                  Cancel
                </Button>
              ) : (
                <>
                  <Button
                    w="100%"
                    color="red"
                    onClick={() => {
                      form.reset();
                      setEditProfile(false);
                    }}
                  >
                    Discard Changes
                  </Button>
                  <Button type="submit" w="100%">
                    Save Changes
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Center>
      </form>
    </>
  );
};

export default EditUserPage;
