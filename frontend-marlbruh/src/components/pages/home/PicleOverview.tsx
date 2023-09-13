import { Loader, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { getLatestPiclePost } from "../../../api/apiCalls";
import { useAuth } from "../../../authentication/AuthContext";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";
import SimplePiclePost from "../picle/SimplePiclePost";

const PicleOverview = () => {
  const auth = useAuth();
  const [latestPost, setLatestPost] = useState(
    undefined as PiclePost | undefined
  );

  useEffect(() => {
    getLatestPiclePost(auth.authToken)
      .then(({ data: post }) => {
        setLatestPost(post);
      })
      .catch((err: AxiosError) => {
        errorNotification(err.message);
      });
  }, []);

  return (
    <>
      <Stack>
        <Title>Pic-le</Title>
        <Text>Latest Post</Text>
        {latestPost ? <SimplePiclePost post={latestPost} /> : <Loader />}
      </Stack>
    </>
  );
};

export default PicleOverview;
