import type { Route } from "./+types/story";
import { useCallback } from "react";
import { useNavigate } from "react-router";

import { userContext } from "~/context";
import { StoryApiRepository } from "~/.server/story";
import GetAllStoriesUseCase from "~/core/get-all-stories-use-case";
import DocumentTree from "~/components/tree";
import Editor from "~/components/editor";
import StorySelector from "~/components/story-selector";
import { Container, Message } from "~/ui";

export async function loader({ context, params }: Route.LoaderArgs) {
  const session = context.get(userContext);

  const storyRepository = new StoryApiRepository(session?.token ?? "");
  const getAllStoriesUseCase = new GetAllStoriesUseCase(storyRepository);
  try {
    const stories = await getAllStoriesUseCase.execute();
    return { stories, storyId: params.id };
  } catch (error) {
    return { error: "Failed to get stories" };
  }
}

export default function Story({ loaderData }: Route.ComponentProps) {
  const { error, stories, storyId } = loaderData;
  const navigate = useNavigate();

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
        <DocumentTree className="py-4"></DocumentTree>
      </aside>

      <section className="h-full px-6 mx-auto container">
        <Editor />
      </section>
    </article>
  );
}
