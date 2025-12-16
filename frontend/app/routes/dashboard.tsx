import type { Route } from "./+types/dashboard";
import { Outlet, redirect, Link } from "react-router";
import { BookHeart } from "lucide-react";

import { authMiddleware } from "~/middleware/auth";
import { userContext } from "~/context";

import { DocumentTree } from "~/ui";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bukuchan" },
    { name: "description", content: "Minimalist creative writing app" },
  ];
}

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
  const session = context.get(userContext);

  if (!session) {
    throw redirect("/login");
  }

  return { user: session.user };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <>
      <header className="px-6 border-b-2 border-base-100 dark:border-base-800 pb-4 flex items-center gap-4">
        <p className="text-xl font-black tracking-wider uppercase">
          <Link to="/" className="flex items-center gap-1">
            <BookHeart />
            Bukuchan
          </Link>
        </p>
        <p>
          Logged in as <b>{user.username}</b>. <Link to="/logout">Logout</Link>
        </p>
      </header>

      <div className="flex">
        <sidebar className="h-full py-6 px-6 ">
          <DocumentTree></DocumentTree>
        </sidebar>

        <main className="h-full py-6 px-6 container mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}
