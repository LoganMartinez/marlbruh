import {
  ActionIcon,
  Center,
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
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(0);

  useEffect(() => {
    if (postsUpdated) {
      getPiclePosts(auth.authToken, 0)
        .then(({ data: posts }) => {
          setAllPosts(posts);
          setNextPage(1);
        })
        .catch((err: AxiosError) => {
          errorNotification(err.message);
        })
        .finally(() => {
          setPostsUpdated(false);
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsUpdated]);

  const loadMore = () => {
    setLoading(true);
    getPiclePosts(auth.authToken, nextPage)
      .then(({ data: posts }) => {
        setAllPosts((prev) => prev.concat(posts));
        setNextPage((prev) => prev + 1);
      })
      .catch((err: AxiosError) => {
        errorNotification(`error loading posts ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
          {allPosts.map((post, i) => (
            <PiclePost
              post={post}
              key={post.id}
              onEnterScreen={i === allPosts.length - 1 ? loadMore : () => {}}
            />
          ))}
        </SimpleGrid>
        {loading && (
          <Center>
            <Loader />
          </Center>
        )}
      </Stack>
    </>
  );
};

export default Pickle;
