import type { Route } from "./+types/story";
import { useCallback } from "react";
import { useNavigate, Outlet, redirect } from "react-router";

import { userContext } from "~/context";
import { StoryApiRepository } from "~/.server/story";
import GetAllStoriesUseCase from "~/core/get-all-stories-use-case";
import GetAllNodesUseCase from "~/core/get-all-nodes-use-case";
import StoryTree, { type StoryNode } from "~/components/tree";
import StorySelector from "~/components/story-selector";
import { Container, Message } from "~/ui";
import { NodeApiRepository } from "~/.server/node";
import type Node from "~/core/node";

export async function loader({ context, params }: Route.LoaderArgs) {
  const session = context.get(userContext);

  const storyRepository = new StoryApiRepository(session?.token ?? "");
  const getAllStoriesUseCase = new GetAllStoriesUseCase(storyRepository);
  const nodeRepository = new NodeApiRepository(session?.token ?? "");
  const getAllNodesUseCase = new GetAllNodesUseCase(nodeRepository);

  try {
    const stories = await getAllStoriesUseCase.execute();
    const nodes = await getAllNodesUseCase.execute(params.id);

    if (!params.node) {
      const selectedNode = nodes
        .map(findFirstScene)
        .find((node) => node !== undefined);
      if (selectedNode) {
        return redirect(
          `/dashboard/stories/${params.id}/node/${selectedNode.id}`
        );
      }
    }

    return {
      stories,
      nodes,
      storyId: params.id,
      selectedNode: params.node,
    };
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}

function toStoryNode(node: Node): StoryNode {
  return {
    id: node.id,
    title: node.name,
    nodeType: node.nodeType,
    children: node.children?.map(toStoryNode),
  };
}

function findFirstScene(node: Node): Node | undefined {
  if (node.nodeType === "scene") {
    return node;
  }
  for (const child of node.children) {
    const scene = findFirstScene(child);
    if (scene) {
      return scene;
    }
  }
}

export default function Story({ loaderData }: Route.ComponentProps) {
  const { error, stories, nodes, storyId, selectedNode } = loaderData;
  const navigate = useNavigate();

  const storyNodes = nodes?.map(toStoryNode) ?? [];

  const onStoryChange = useCallback(
    (id: string) => {
      navigate(`/dashboard/stories/${id}`);
    },
    [navigate]
  );

  if (error || !stories || !storyId) {
    return (
      <Container variant="center">
        <Message level="error">{error}</Message>
      </Container>
    );
  }

  return (
    <article className="grid w-full grid-cols-[auto_1fr] py-8">
      <aside className="h-full pl-6 w-sm">
        {/* TODO: Extract this to a UserSidebar component */}
        <section className="w-full border-b border-gray-400 pb-4">
          <StorySelector
            stories={stories}
            currentId={storyId}
            className="w-full"
            onChange={onStoryChange}
          />
        </section>
        <StoryTree
          className="py-6 w-full"
          key={storyNodes.map((node) => node.id).join(",")}
          nodes={storyNodes}
          defaultSelected={selectedNode}
        ></StoryTree>
      </aside>

      <section className="h-full px-6 mx-auto ">
        <Outlet />
      </section>
    </article>
  );
}
