import { Divider, Stack, Title } from "@mantine/core";
import ChoreOverview from "./ChoreOverview";
import PicleOverview from "./PicleOverview";

const Home = () => {
  return (
    <Stack>
      <Title align="center">Welcome to Marlbruh</Title>
      <Divider />
      <ChoreOverview />
      <Divider />
      <PicleOverview />
    </Stack>
  );
};

export default Home;
