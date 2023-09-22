import {
  ActionIcon,
  Group,
  Loader,
  SimpleGrid,
  Space,
  Stack,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useAuth } from "../../../authentication/AuthContext";
import { getPiclePosts } from "../../../api/apiCalls";
import { AxiosError } from "axios";
import { errorNotification } from "../../../utilities/helperFunctions";
import PiclePost from "./PiclePost";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import PiclePostCreationModal from "./PiclePostCreationModal.tsx";

const Pickle = () => {
  const auth = useAuth();
  const [allPosts, setAllPosts] = useState([] as PiclePost[]);
  const [postsUpdated, setPostsUpdated] = useState(true);
  const [createModalOpen, createModalOpenHandlers] = useDisclosure(false);

  useEffect(() => {
    if (postsUpdated) {
      getPiclePosts(auth.authToken)
        .then(({ data: posts }) => {
          setAllPosts(posts.reverse());
        })
        .catch((err: AxiosError) => {
          errorNotification(err.message);
        })
        .finally(() => setPostsUpdated(false));
    }
  }, [postsUpdated]);

  return (
    <>
      <PiclePostCreationModal
        opened={createModalOpen}
        openHandlers={createModalOpenHandlers}
        setPostsUpdated={setPostsUpdated}
      />
      <Stack>
        <Title align="center">Pic-le</Title>
        <Group position="apart">
          <Space />
          <ActionIcon onClick={createModalOpenHandlers.open}>
            <IconPlus />
          </ActionIcon>
        </Group>
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: "62rem", cols: 3, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {postsUpdated ? (
            <Loader />
          ) : (
            allPosts.map((post) => (
              <PiclePost
                post={post}
                key={post.id}
                postsUpdated={postsUpdated}
                setPostsUpdated={setPostsUpdated}
              />
            ))
          )}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default Pickle;
