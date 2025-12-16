import type { Route } from "./+types/index";
import { Navigate } from "react-router";

import { Button, Container, Message } from "~/ui";
import { userContext } from "~/context";
import { StoryApiRepository } from "~/.server/story";
import GetAllStoriesUseCase from "~/core/get-all-stories-use-case";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bukuchan" },
    { name: "description", content: "Minimalist creative writing app" },
  ];
}

// export default function DashboardIndex() {
//   return (
//     <article className="grid gap-4 h-full">
//       <Editor></Editor>
//       {/*}
//       <p>You have no stories yet.</p>
//       <p>
//         <Button to="/dashboard/new-story">Create a new story</Button>
//       </p>
//       {*/}
//     </article>
//   );
export async function loader({ context }: Route.LoaderArgs) {
  const session = context.get(userContext);

  const storyRepository = new StoryApiRepository(session?.token ?? "");
  const getAllStoriesUseCase = new GetAllStoriesUseCase(storyRepository);

  try {
    const stories = await getAllStoriesUseCase.execute();
    console.log(stories);
    return { stories };
  } catch (error) {
    return { error: "Failed to get stories" };
  }
}

export default function DashboardIndex({ loaderData }: Route.ComponentProps) {
  const { error, stories } = loaderData;

  if (error) {
    return (
      <Container variant="center">
        <Message level="error">{error}</Message>
      </Container>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <Container variant="center" className="text-center">
        <p>You have no stories yet.</p>
        <p className="pt-8">
          <Button to="/dashboard/new-story">Create a new story</Button>
        </p>
      </Container>
    );
  }

  const lastStory = stories[stories.length - 1];

  return <Navigate to={`/dashboard/stories/${lastStory.id}`} />;
}
