import type { Route } from "./+types/node";
import { useCallback } from "react";
import { useNavigate, useFetcher } from "react-router";

import { userContext } from "~/context";
import { StoryApiRepository } from "~/.server/story";
import { NodeApiRepository } from "~/.server/node";
import GetAllStoriesUseCase from "~/core/get-all-stories-use-case";
import Editor from "~/components/editor";
import { Container, Message } from "~/ui";

export async function loader({ context, params }: Route.LoaderArgs) {
  const session = context.get(userContext);
  const storyRepository = new StoryApiRepository(session?.token ?? "");
  const nodeRepository = new NodeApiRepository(session?.token ?? "");
  const getAllStoriesUseCase = new GetAllStoriesUseCase(storyRepository);

  try {
    const stories = await getAllStoriesUseCase.execute();
    const node = await nodeRepository.getById(params.id, params.node);
    const analysis = await nodeRepository.analysis(params.id, params.node);

    return { stories, storyId: params.id, node, nodeId: params.node, analysis };
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
  const { error, stories, storyId, node, nodeId, analysis } = loaderData;
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
    <div className="flex gap-4">
      <div className="w-4xl">
        <Editor
          content={node.text}
          onContentChange={onContentChange} />
      </div>
      <div className="w-3xs">
        <div className="bg-base-200 h-auto rounded p-2">Word count: {analysis['word-count']}</div>
      </div>
    </div>
  );
}
