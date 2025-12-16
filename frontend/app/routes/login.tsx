import type { Route } from "./+types/login";
import { redirect, Form } from "react-router";
import { BookHeart } from "lucide-react";

import { Heading, TextInput, Button, Message, Container } from "~/ui";
import { verifyUser } from "~/.server/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bukuchan" },
    { name: "description", content: "Minimalist creative writing app" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const userId = formData.get("user") as string;
  const password = formData.get("password") as string;

  if (!userId || !password) {
    return { error: "User and password are required" };
  }

  const token = await verifyUser(userId, password);
  if (!token) {
    return { error: "Invalid user or password" };
  }

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  });
}

export default function Login({ actionData }: Route.ComponentProps) {
  const error = actionData?.error;

  return (
    <Container variant="center">
      <BookHeart
        strokeWidth={1.0}
        className="w-64 h-64 text-center mx-auto py-6"
      />
      <Heading className="text-center">Login</Heading>

      <Form method="post" action="/login" className="pt-8 grid gap-6 w-md">
        {error && <Message level="error">{error}</Message>}

        <TextInput
          label="User"
          placeholder="rana-gustavo"
          name="user"
          autoComplete="current-user"
          isRequired={true}
        />
        <TextInput
          autoComplete="current-password"
          label="Password"
          placeholder="croac!1337"
          type="password"
          name="password"
          isRequired={true}
        />
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}
