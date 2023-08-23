import { Divider, Stack, Title } from "@mantine/core";
import ChoreOverview from "./ChoreOverview";

const Home = () => {
  return (
    <Stack>
      <Title align="center">Welcome to Marlbruh</Title>
      <Divider />
      <ChoreOverview />
    </Stack>
  );
};

export default Home;
