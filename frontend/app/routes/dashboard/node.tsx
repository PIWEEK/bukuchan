import type { Route } from "./+types/node";
import { useCallback } from "react";
import { useNavigate, useFetcher } from "react-router";

import { userContext } from "~/context";
import { StoryApiRepository } from "~/.server/story";
import { NodeApiRepository } from "~/.server/node";
import GetAllStoriesUseCase from "~/core/get-all-stories-use-case";
import StoryTree from "~/components/tree";
import Editor from "~/components/editor";
import StorySelector from "~/components/story-selector";
import { Container, Message } from "~/ui";

export async function loader({ context, params }: Route.LoaderArgs) {
  const session = context.get(userContext);
  const storyRepository = new StoryApiRepository(session?.token ?? "");
  const nodeRepository = new NodeApiRepository(session?.token ?? "");
  const getAllStoriesUseCase = new GetAllStoriesUseCase(storyRepository);

  try {
    const stories = await getAllStoriesUseCase.execute();
    const node = await nodeRepository.getById(params.id, params.node);

    return { stories, storyId: params.id, node, nodeId: params.node };
  } catch (error) {
    console.error(error);
    return { error: "Failed to get stories" };
  }
}

export async function action({ context, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const storyId = formData.get("storyId") as string;
  const nodeId = formData.get("nodeId") as string;
  const text = formData.get("text") as string;

  const session = context.get(userContext);
  const nodeRepository = new NodeApiRepository(session?.token ?? "");

  try {
    let node = await nodeRepository.getById(storyId, nodeId);
    node = await nodeRepository.update(storyId, { ...node, text });
    return { node };
  } catch (error) {
    console.error(error);
    return { error: "Failed to save" };
  }
}

export default function Story({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const { error, stories, storyId, node, nodeId } = loaderData;
  const navigate = useNavigate();

  const fetcher = useFetcher();

  const onStoryChange = useCallback(
    (id: string) => {
      navigate(`/dashboard/stories/${id}`);
    },
    [navigate]
  );

  const onContentChange = useCallback(
    (text: string) => {
      const formData = new FormData();
      formData.append("storyId", storyId ?? "");
      formData.append("nodeId", nodeId ?? "");
      formData.append("text", text ?? "");
      return fetcher.submit(formData, { method: "post" });
    },
    [fetcher, storyId, nodeId]
  );

  if (error || !stories || !storyId) {
    return (
      <Container variant="center">
        <Message level="error">{error}</Message>
      </Container>
    );
  }

  return (
    <article className="grid w-full grid-cols-[auto_1fr] gap-8 py-8">
      <aside className="h-full px-6">
        {/* TODO: Extract this to a UserSidebar component */}
        <section className="w-full border-b border-gray-400 pb-4">
          <StorySelector
            stories={stories}
            currentId={storyId}
            className="w-full"
            onChange={onStoryChange}
          />
        </section>

        <StoryTree className="py-6 w-full"></StoryTree>
      </aside>

      <section className="h-full px-6 mx-auto container">
        <Editor content={node.text} onContentChange={onContentChange} />
      </section>
    </article>
  );
}
