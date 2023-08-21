import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  rem,
  Group,
  Space,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconHome } from "@tabler/icons-react";
import { createUser } from "../../../api/apiCalls";
import { useAuthWithoutToken } from "../../../authentication/AuthContext";
import imageUrl from "../../../assets/marlborough.png";
import PfpDropzone from "./PfpDropzone";
import { FileWithPath } from "@mantine/dropzone";
import ProfileColorSwatches from "../../reusableComponents/ProfileColorSwatches";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(900),
    backgroundSize: "cover",
    backgroundImage: `url(${imageUrl})`,
  },
  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: rem(900),
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface Form {
  username: string;
  password: string;
  pfp: FileWithPath | undefined;
  profileColor: string;
}

interface Props {
  setShowRegistration: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Register = ({ setShowRegistration }: Props) => {
  const { classes } = useStyles();
  const auth = useAuthWithoutToken();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      pfp: undefined as FileWithPath | undefined,
      profileColor: "blue",
    },
    validate: {
      username: (value) => (value ? null : "Enter a username"),
      password: (value) => (value ? null : "Enter a password"),
      confirmPassword: (value, values) => {
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

  const submitForm = ({ username, password, pfp, profileColor }: Form) => {
    createUser(username, password, pfp, profileColor)
      .then(({ data: { token } }) => {
        auth.setAuthToken(token);
      })
      .catch((err) => {
        console.error(err);
        auth.clearAuthToken;
      });
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Group position="center">
          <IconHome size="2rem" />
          <Title order={1}>Marlbruh</Title>
        </Group>

        <form onSubmit={form.onSubmit((values) => submitForm(values))}>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="Username"
            size="md"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Password"
            mt="md"
            size="md"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            withAsterisk
            label="Confirm password"
            placeholder="Confirm password"
            mt="md"
            size="md"
            {...form.getInputProps("confirmPassword")}
          />
          <Space h="xs" />
          <Text>
            <b>Profile Picture</b>
          </Text>
          <PfpDropzone
            value={form.values.pfp}
            setValue={(pfp: FileWithPath | undefined) =>
              form.setFieldValue("pfp", pfp)
            }
          />
          <Space h="xs" />
          <Text>
            <b>Profile Color</b>
          </Text>
          <ProfileColorSwatches
            selectedColor={form.values.profileColor}
            setSelectedColor={(color) =>
              form.setFieldValue("profileColor", color)
            }
          />
          <Button type="submit" fullWidth mt="xl" size="md">
            Register
          </Button>
        </form>

        <Text ta="center" mt="md">
          Already have an account?{" "}
          <Anchor<"button">
            weight={700}
            onClick={() => setShowRegistration(false)}
          >
            Login
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};

export default Register;
