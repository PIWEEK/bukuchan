import type { Route } from "./+types/home";
import { Link, redirect } from "react-router";
import { BookHeart } from "lucide-react";

import { getUserFromSession } from "~/.server/auth";
import Heading from "~/ui/heading";
import { authMiddleware } from "~/middleware/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bukuchan" },
    { name: "description", content: "Minimalist creative writing app" },
  ];
}

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUserFromSession(request);

  if (user) {
    throw redirect("/dashboard");
  }

  return { user };
}

export default function Home() {
  return (
    <article className="h-full grid place-content-center">
      <BookHeart
        strokeWidth={1.0}
        className="w-64 h-64 text-center mx-auto py-6"
      />
      <Heading className="my-6 text-center">Hola!</Heading>
      <p className="text-center text-xl">
        <Link to="/login">Login</Link>
      </p>
    </article>
  );
}
