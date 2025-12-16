import type { Route } from "./+types/new-story";
import { Form, redirect } from "react-router";

import CreateStoryUseCase from "~/core/create-story-use-case";
import { StoryApiRepository } from "~/.server/story";
import { userContext } from "~/context";
import type User from "~/core/user";

import { Heading, TextInput, Button, Container, Message } from "~/ui";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bukuchan" },
    { name: "description", content: "Minimalist creative writing app" },
  ];
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const user = context.get(userContext);

  if (!user) {
    throw redirect("/login");
  }

  if (!title) {
    return { error: "Title is required" };
  }

  if (title.length < 3) {
    return { error: "Title must be at least 3 characters long" };
  }

  const createStoryUseCase = new CreateStoryUseCase(new StoryApiRepository());
  const story = await createStoryUseCase.execute(user, title);

  if (!story) {
    return { error: "Failed to create story" };
  }

  return redirect(`/dashboard/stories/${story.id}`);
}

export default function NewStory({ actionData }: Route.ComponentProps) {
  const error = actionData?.error;

  return (
    <Container variant="center">
      <Heading className="text-center">New story</Heading>
      <Form method="post" className="pt-8 grid gap-6 w-md">
        {error ? <Message level="error">{error}</Message> : null}
        <TextInput
          label="Title"
          name="title"
          placeholder="The Lord of the Rings"
          autoFocus={true}
          isRequired={true}
        />
        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
}
