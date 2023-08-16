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

const useStyles = createStyles((theme) => ({
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

export function Login() {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const submitForm = (values: Form) => {
    console.log(values);
  };

  return (
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
          Login
        </Button>
      </form>

      <Text ta="center" mt="md">
        Don&apos;t have an account?{" "}
        <Anchor<"a">
          href="#"
          weight={700}
          onClick={(event) => event.preventDefault()}
        >
          Register
        </Anchor>
      </Text>
    </Paper>
  );
}

export default Login;
