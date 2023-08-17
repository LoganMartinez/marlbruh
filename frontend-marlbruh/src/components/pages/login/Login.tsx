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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconHome } from "@tabler/icons-react";
import { getToken } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import imageUrl from "../../../assets/marlborough.png";

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
}

interface Props {
  setShowRegistration: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login = ({ setShowRegistration }: Props) => {
  const { classes } = useStyles();
  const auth = useAuth();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) => (value ? null : "Enter a username"),
      password: (value) => (value ? null : "Enter a password"),
    },
  });

  const submitForm = ({ username, password }: Form) => {
    getToken(username, password)
      .then(({ data: { token } }) => {
        auth.setAuthToken(token);
      })
      .catch((err) => {
        console.error(err);
        auth.clearAuthToken();
        form.setErrors({
          username: "invalid username or password",
          password: "invalid username or password",
        });
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
            label="Username"
            placeholder="Username"
            size="md"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            mt="md"
            size="md"
            {...form.getInputProps("password")}
          />
          <Button type="submit" fullWidth mt="xl" size="md">
            Logan
          </Button>
        </form>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor<"button">
            weight={700}
            onClick={() => setShowRegistration(true)}
          >
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};

export default Login;
